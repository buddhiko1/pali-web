# PaliWeb

## Developer's guide

- Css class attribute order: size, shape, color, action, text.
- The component's css only focused on the layout.
- The unit of time for components should be milliseconds.
- Use 'hl' to represent 'highlight, 'bg' to represent 'background'.
- 'g-': global css, 'd-': dialog css, 'c-': component css.
- Colors of element must get from the theme.css.

## Tips

- Token to generate graphql code must created by admin.
- Public role should have permission to read users' information.
- When compile error, try it again after delete dist or .angular directory.
- Update packages: pnpm update.
- Generate graphql code: pnpm run codegen.
