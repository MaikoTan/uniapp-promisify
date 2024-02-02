<p align="center">
  <h1 align="center">uniapp-promisify</h1>
</p>

<p align="center">

![NPM Version](https://img.shields.io/npm/v/uniapp-promisify?style=flat)
![NPM Downloads](https://img.shields.io/npm/dw/uniapp-promisify)
[![Build](https://github.com/MaikoTan/uniapp-promisify/actions/workflows/build.yml/badge.svg)](https://github.com/MaikoTan/uniapp-promisify/actions/workflows/build.yml)
![GitHub issues](https://img.shields.io/github/issues/MaikoTan/uniapp-promisify)
![GitHub pull requests](https://img.shields.io/github/issues-pr/MaikoTan/uniapp-promisify)
![GitHub License](https://img.shields.io/github/license/MaikoTan/uniapp-promisify?color=green)

</p>

[English](https://github.com/MaikoTan/uniapp-promisify/blob/master/README.md) | 简体中文

## 初衷

UniApp 官方的 API 使用的是过时的回调风格，尽管最新版本的 UniApp 支持了 `Promise` 方式，但官方 API 的类型还没有更新，更糟糕的是官方的 `Promisify` 方法[在 Vue 2 和 Vue 3 中的行为不同](https://uniapp.dcloud.net.cn/api/#vue-2-%E5%92%8C-vue-3-%E7%9A%84-api-promise-%E5%8C%96)。

与其手动处理多个平台的条件判断和类型转换，不如直接对官方的回调风格 API 进行简单的包装，将回调转换为 `Promise` 的风格，并自动推断返回类型。

## 安装

```bash
npm install uniapp-promisify
# Or use yarn
yarn add uniapp-promisify
```

## 使用

```ts
import { promisify } from 'uniapp-promisify'

// Promisify 单个函数
const login = promisify(uni.login)
const res = await login()
//     ^? UniNamespace.LoginRes

// 或者 Promisify `uni` 全局对象
const pUni = promisify(uni)
const res = await pUni.login()
//     ^? UniNamespace.LoginRes
```

理想的使用方式是，建立一个文件，导出被 Promisify 过的 `uni` 对象：

```ts
// utils.ts
import { promisify } from 'uniapp-promisify'

export {
  uni: promisify(uni)
}

// App.vue
import { uni } from './utils.ts'

onLoad(async () => {
  await uni.login()
})
```

## 许可证

本项目使用 AGPL-3.0 许可证 - 有关详细信息，请参阅 [LICENSE](./LICENSE) 文件。
