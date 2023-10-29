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
- Generate graphql code: pnpm run gen.
- rgignore is read by telescope.
- [Prettier and Eslint](https://blog.bitsrc.io/how-ive-set-up-eslint-and-prettier-in-angular-16-and-why-i-did-that-4bfc304284a6)
- Batch convert jpg to webp with bash command: `for i in *.jpg; do cwebp -q 90 "$i" -o "${i%.jpg}.webp"; done`.
