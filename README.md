# PaliWeb

## Developer's guide

- The component's css only focused on the layout.
- The unit of time for components should be milliseconds.
- Use 'hl' to represent 'highlight, 'bg' to represent 'background'.
- Css class: 'ga-': global animation, 'gc-': global component, 'gu-': globalutility, 'gd-': global dialog, 'c-': component.
- Colors of the element must get from the theme.css.

## Tips

- Token to generate graphql code must created by admin.
- Public role should have permission to read users' information.
- When occurs compile error, try it again after deleting .angular directory.
- Update packages: pnpm update.
- Generate graphql code: pnpm run gen.
- rgignore is read by telescope.
- [Prettier and Eslint](https://blog.bitsrc.io/how-ive-set-up-eslint-and-prettier-in-angular-16-and-why-i-did-that-4bfc304284a6)
- Batch converts jpg to webp with bash command: `for i in *.jpg; do cwebp -q 90 "$i" -o "${i%.jpg}.webp"; done`.
- Init tailwindcss: `npx tailwindcss init --ts`.
