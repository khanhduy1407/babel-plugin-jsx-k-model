import test from 'ava'
import { transform } from 'babel-core'

const transpile = src => {
  return transform(src, {
    plugins: './index'
  }).code.trim()
}

const testTranspile = (title, code) => {
  test(title, t => {
    const compiled = transpile(code)

    t.snapshot(code, 'Initial code')
    t.snapshot(compiled, 'Compiled code')
  })
}

const testError = (title, code) => {
  test(title, t => {
    const error = t.throws(() => transpile(code), SyntaxError)

    t.snapshot(code, 'Initial code')
    t.snapshot(error.message, 'Error mesage')
  })
}

testError(
  'Error: input[type={dynamic}, k-model]',
  `
  <input
    type={e}
    k-model={a.b}
  />
`
)
testError(
  'Error: input[k-model:invalidModifier]',
  `
  <input
    k-model:invalidModifier={a.b}
  />
`
)
testError(
  'Error: input[k-model, k-model]',
  `
  <input
    k-model={a.b}
    k-model={a.b}
  />
`
)
testError(
  'Error: input[k-model="string literal"]',
  `
  <input
    k-model="string literal"
  />
`
)
testError(
  'Error: input[k-model={identifier}]',
  `
  <input
    k-model={identifier}
  />
`
)
testError(
  'Error: h3',
  `
  <h3
    k-model={a.b}
  />
`
)
testError(
  'Error: select[k-model:trim]',
  `
  <select
    k-model:trim={a.b}
  />
`
)
testError(
  'Error: input[type="checkbox",k-model:trim]',
  `
  <input
    type="checkbox"
    k-model:trim={a.b}
  />
`
)
testError(
  'Error: input[type="radio",k-model:trim]',
  `
  <input
    type="radio"
    k-model:trim={a.b}
  />
`
)
testError(
  'Error: input[type="file",k-model]',
  `
  <input
    type="file"
    k-model={a.b}
  />
`
)

testTranspile(
  'Ignores namespaced attributes',
  `
  <input
    onClick:prevent={hey}
  />
`
)
testTranspile(
  'textarea[k-model]',
  `
  <textarea
    k-model={a.b}
  />
`
)
testTranspile(
  'input[k-model]',
  `
  <input
    k-model={a.b}
  />
`
)
testTranspile(
  'input[k-model={a.b[c.d[e]]}]',
  `
  <input
    k-model={a.b[c.d[e]]}
  />
`
)
testTranspile(
  'input[type="range", k-model]',
  `
  <input
    type="range"
    k-model={a.b}
  />
`
)
testTranspile(
  'input[k-model:lazy]',
  `
  <input
    k-model:lazy={a.b}
  />
`
)
testTranspile(
  'input[k-model:number]',
  `
  <input
    k-model:number={a.b}
  />
`
)
testTranspile(
  'input[k-model:trim]',
  `
  <input
    k-model:trim={a.b}
  />
`
)
testTranspile(
  'input[type="checkbox", k-model]',
  `
  <input
    type="checkbox"
    k-model={a.b}
    {...spreadForCoverage}
  />
`
)
testTranspile(
  'input[type="checkbox", value="forArray", true-value={{hello: true}}, false-value={{hello: false}}, k-model:number]',
  `
  <input
    type="checkbox"
    k-model:number={a.b}
    value="forArray"
    true-value={{hello: true}}
    false-value={{hello: false}}
    {...spreadForCoverage}
  />
`
)
testTranspile(
  'input[type="radio", k-model]',
  `
  <input
    type="radio"
    k-model={a.b}
    {...spreadForCoverage}
  />
`
)
testTranspile(
  'input[type="radio", value="101", k-model:number]',
  `
  <input
    type="radio"
    value="101"
    k-model:number={a.b}
    {...spreadForCoverage}
  />
`
)
testTranspile(
  'select',
  `
  <select
    k-model={a.b}
  />
`
)
testTranspile(
  'select[k-model:number]',
  `
  <select
    k-model:number={a.b}
  />
`
)
testTranspile(
  'custom-element[k-model]',
  `
  <custom-element
    k-model={a.b}
  />
`
)
testTranspile(
  'custom-element[k-model:trim]',
  `
  <custom-element
    k-model:trim={a.b}
  />
`
)
testTranspile(
  'custom-element[k-model:number]',
  `
  <custom-element
    k-model:number={a.b}
  />
`
)
