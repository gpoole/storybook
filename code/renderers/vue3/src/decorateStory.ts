import type { ConcreteComponent, Component, ComponentOptions } from 'vue';
import { h } from 'vue';
import type { DecoratorFunction, StoryContext, LegacyStoryFn } from '@storybook/types';
import { sanitizeStoryContextUpdate } from '@storybook/preview-api';

import type { Args, StoryContextUpdate } from '@storybook/csf';
import type { VueRenderer } from './types';

/*
  This normalizes a functional component into a render method in ComponentOptions.

  The concept is taken from Vue 3's `defineComponent` but changed from creating a `setup`
  method on the ComponentOptions so end-users don't need to specify a "thunk" as a decorator.
 */

function normalizeFunctionalComponent(options: ConcreteComponent): ComponentOptions {
  return typeof options === 'function' ? { render: options, name: options.name } : options;
}

function prepare(
  rawStory: VueRenderer['storyResult'],
  innerStory?: ConcreteComponent
): Component | null {
  const story = normalizeFunctionalComponent(rawStory as ComponentOptions);

  if (story == null) {
    return null;
  }

  if (innerStory) {
    return {
      // Normalize so we can always spread an object
      ...normalizeFunctionalComponent(story),
      components: { ...(story.components || {}), story: innerStory },
    };
  }

  return {
    render() {
      return h(story);
    },
  };
}

export function decorateStory(
  storyFn: LegacyStoryFn<VueRenderer>,
  decorators: DecoratorFunction<VueRenderer>[]
): LegacyStoryFn<VueRenderer> {
  return decorators.reduce(
    (decorated: LegacyStoryFn<VueRenderer>, decorator) => (context: StoryContext<VueRenderer>) => {
      let story: VueRenderer['storyResult'] | undefined;

      const decoratedStory: VueRenderer['storyResult'] = decorator((update) => {
        // we should update the context with the update object from the decorator in reactive way
        // so that the story will be re-rendered with the new context
        story = decorated({
          ...context,
          ...sanitizeStoryContextUpdate(update),
        });
        if (update && update.args && update.args !== context.args) story = h(story, update.args);

        return story;
      }, context);

      if (!story) {
        story = decorated(context);
      }

      if (decoratedStory === story) {
        return story;
      }

      const innerStory = () => (story?.props ? story : h(story!, context.args));
      return prepare(decoratedStory, innerStory) as VueRenderer['storyResult'];
    },
    (context) => prepare(storyFn(context)) as LegacyStoryFn<VueRenderer>
  );
}
