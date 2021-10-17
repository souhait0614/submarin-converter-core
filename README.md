# submarin-converter-v2

submarin-convert-bot から再配布が出来ないコードを取り除いてオープンソース化したもの

## Requirement

- [Volta](https://volta.sh)
- [Node.js](https://nodejs.org) (14.18.1)
- [Yarn](https://yarnpkg.com) (1.22.17)

## Usage
```js
const { SB } = require("submarin-converter-v2")
const converter = new SB()

converter.convert({
  target:"こんにちは",
  converter:[
    {name: "cjp"}
  ]
}).then(({text})=>{
  console.log(text) //ごんにさは
})
```
```js
const { SB } = require("submarin-converter-v2")
const converter = new SB({
  converter:{
    nomlish:require("nomlish")
  }
})

converter.convert({
  target:"こんにちは",
  converter:[
    {name: "nomlish", option:[5]},
    {name: "cjp"},
    {name: "genhera"},
  ]
}).then(({text})=>{
  console.log(text) /*そﾗさ……仆ゎ……
                      ごんにさゎ
                      　ぉ　と　ぎ　ば　な　ﾚ　ゎ　终　ゎ　ﾘ　さ　……*/
})
```
