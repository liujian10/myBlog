# marquee-js
Marquee plugin with Javascript support

## Install

[![marquee-js](https://nodei.co/npm/marquee-js.png)](https://npmjs.org/package/marquee-js)

## Development

```bash
# install
npm install --save marquee-js

# run
gulp server

# build
gulp build
```

## Example

local: http://localhost:3001/

online: http://mapleliu.com/marquee-js/

## Usage

用于处理文字，超长自动循环滚动；

```html
// cdn
<script src='https://cdn.jsdelivr.net/npm/marquee-js@1.0.3/dist/marquee.min.js'></script>
```

```js
marqueeJs(dom,options);
```

## API

### props

| 参数 | 说明 | 类型 | 默认值 | 单位 |
|-----------|-----------|-----------|-------------|-------------|
| dom | 需要处理的dom元素 | `HTMLElement` | - | - |
| options | 配置项 | `Object` | - | - |

### options

| 参数 | 说明 | 类型 | 默认值 | 单位 |
|-----------|-----------|-----------|-------------|-------------|
| speed | 更新速度 | `Number` | - | `ms(毫秒)/px(象素)` |
| width | 自定义元素宽度 | `Number` | 元素自身宽度 | `px` |
| height | 自定义元素高度 | `Number` | 元素自身高度 | `px` |
| delay | 延时时长 | `Number` | 0 | `ms` |