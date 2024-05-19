## react-latex

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-latex.svg)](https://www.npmjs.com/package/react-latex) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## React Latex Parser is the react library for parsing the latex expression in react.
It dynamically loads the MathJax when the Latex component is called which eliminates the overhead of calling the cdn of MathJax when not required.


## Install

```bash
npm install --save react-latex-parser
```

## Usage

```tsx
import React, { Component } from 'react'

import Latex from 'react-latex'

//to render the latex text
class Example extends Component {
  render() {
    return <MyComponent latexExpression={"This is to render the latex"} />
  }
}
```
## License

MIT © [bhusal-rj](https://github.com/bhusal-rj)
