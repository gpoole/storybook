```jsx filename="src/components/Button.jsx" renderer="nextjs" language="js" tabTitle="JavaScript"
// This import will work in Storybook
import styles from './Button.module.css';
// Sass/Scss is also supported
// import styles from './Button.module.scss'
// import styles from './Button.module.sass'

export function Button() {
  return (
    <button type="button" className={styles.error}>
      Destroy
    </button>
  );
}
```

```tsx filename="src/components/Button.tsx" renderer="nextjs" language="ts" tabTitle="TypeScript"
// This import will work in Storybook
import styles from './Button.module.css';
// Sass/Scss is also supported
// import styles from './Button.module.scss'
// import styles from './Button.module.sass'

export function Button() {
  return (
    <button type="button" className={styles.error}>
      Destroy
    </button>
  );
}
```
