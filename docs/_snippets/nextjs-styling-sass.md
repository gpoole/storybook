```js filename=".storybook/preview.js|ts" renderer="nextjs" language="js"
// .storybook/preview.js|ts
import '../styles/globals.scss';
```

```js filename="next.config.js" renderer="nextjs" language="js"
// next.config.js
import * as path from 'path';

export default {
  // Any options here are included in Sass compilation for your stories
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
```
