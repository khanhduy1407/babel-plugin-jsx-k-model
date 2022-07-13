## JSX k-model for Kdu JSX

This babel plugin adds some syntactic sugar to JSX.

### Usage:

```bash
npm i babel-plugin-jsx-k-model -D
```

Then add `jsx-k-model` to your `.babelrc` file under `plugins`

example .babelrc:
```json
{
  "presets": ["es2015"],
  "plugins": ["jsx-k-model", "transform-kdu-jsx"]
}
```

code:
```js
Kdu.component('hello-world', {
  data: () => ({
    text: 'Hello World!'
  }),
  render () {
    return (
      <div>
        <input type="text" k-model={this.text} />
        {this.text}
      </div>
    )
  }
})
```

Behaviour is similar to kdu template's [k-model](https://kdujs-v2.web.app/v2/api/#k-model).
