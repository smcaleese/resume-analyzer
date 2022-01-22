# Coding Standards

## General
- Use 4 whitespaces.
- Don't use semi-colons.
- Use single quotes.

## File Names
- Use PascalCase.

## Javascript
- Use spaces for curly braces on a single line.
- eg. `import { nanoid } from 'nanoid'`
- Use arrow functions.

## CSS
- When using styled components, indent the first block of styles.
- Add a space after semi-colons.
- Add a space before curly brackets.
eg.

```
export default styled(FileUploadPage)`
    height: 100%;
    width: 100%;
    margin-top: 8rem;

    .upload-form {
        width: 50rem;
        padding: 2rem;
        z-index: 100;
    }
`
```

## CSS Frameworks
- CSS frameworks: use `react bootstrap` by default 
