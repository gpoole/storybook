```js filename="next.config.js" renderer="nextjs" language="js" tabTitle="JavaScript"
import * as path from 'path';

export default {
  // Any options here are included in Sass compilation for your stories
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
```

```ts filename="next.config.ts" renderer="nextjs" language="ts" tabTitle="TypeScript"
import * as path from 'path';

export default {
  // Any options here are included in Sass compilation for your stories
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
```
