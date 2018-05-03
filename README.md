# PostCSS Partial Process

[PostCSS] plugin that runs other plugins on parts of a CSS file delimited by comments.

[PostCSS]: https://github.com/postcss/postcss

## Usage

```js
postcss([ require('postcss-partial-process')({
    startComment: 'start postcss-partial-process', // default value
    endComment: 'end postcss-partial-process', // default value
    removeComments: true, // false by default
    plugins = [
        require('[any postcss plugin you want]'), // this will only affect the CSS between the comments "start postcss-partial-process" and  "end postcss-partial-process"
    ],
}) ])
```

See [PostCSS] docs for examples for your environment.
