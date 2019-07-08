# PostCSS Partial Process

[PostCSS] plugin that runs other plugins on parts of a CSS file delimited by comments.

## Installation

```bash
npm install postcss-partial-process
```

## Usage

```js
postcss([
  require('postcss-partial-process')({
    startComment: 'postcss-partial-process start', // default
    endComment: 'postcss-partial-process end', // default
    removeComments: 'auto', // default, means the comments are removed unless they are important (e.g. /*! like this */); also accepts `true` or `false`
    plugins = [
      require('some postcss plugin'), // this plugin will only run between the comments "postcss-partial-process start" and "postcss-partial-process end"
    ],
  }),
])
```

See [PostCSS] docs for examples for your environment.

[PostCSS]: https://github.com/postcss/postcss
