<p align="center">
  <h1 align="center">uniapp-promisify</h1>
</p>

<p align="center">

[![NPM Version](https://img.shields.io/npm/v/uniapp-promisify?style=flat)](https://www.npmjs.com/package/uniapp-promisify)
[![NPM Downloads](https://img.shields.io/npm/dw/uniapp-promisify)](https://www.npmjs.com/package/uniapp-promisify)
[![Build](https://github.com/MaikoTan/uniapp-promisify/actions/workflows/build.yml/badge.svg)](https://github.com/MaikoTan/uniapp-promisify/actions/workflows/build.yml)
[![GitHub issues](https://img.shields.io/github/issues/MaikoTan/uniapp-promisify)](https://github.com/MaikoTan/uniapp-promisify/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/MaikoTan/uniapp-promisify)](https://github.com/MaikoTan/uniapp-promisify/pulls)
[![GitHub License](https://img.shields.io/github/license/MaikoTan/uniapp-promisify?color=green)](https://github.com/MaikoTan/uniapp-promisify/blob/master/LICENSE)

</p>

[English](https://github.com/MaikoTan/uniapp-promisify/blob/master/README.md) | 简体中文

## 初衷

UniApp 官方的 API 使用的是过时的回调风格，尽管最新版本的 UniApp 的部分 API 支持了 `Promise` 的调用，但官方 API 的类型并没有对其支持，更糟糕的是官方的 `Promise` 调用方式[在 Vue 2 和 Vue 3 中的行为不同](https://uniapp.dcloud.net.cn/api/#vue-2-%E5%92%8C-vue-3-%E7%9A%84-api-promise-%E5%8C%96)。

与其手动处理多个平台的条件判断和类型转换，不如直接对官方的回调 API 进行简单的包装，将回调函数转换为 `Promise` 的 `resolve` 和 `reject`，并自动推断返回类型。

## 安装

```bash
npm install uniapp-promisify
# Or use yarn
yarn add uniapp-promisify
# Or use pnpm
pnpm i uniapp-promisify
```

## 使用

`uniapp-promisify` 导出了一个名为 `promisify` 的函数，可以按照以下方式使用：

- Promise 化单个函数

```ts
import { promisify } from 'uniapp-promisify'

const login = promisify(uni.login)
const res = await login()
//     ^? UniNamespace.LoginRes
```

- 直接使用 `uniapp-promisify` 中导出的 `uni` 对象，该对象中的方法已经被 Promise 化

```ts
import { uni } from 'uniapp-promisify'
```

## 同步 API

由于一些方法总是同步调用，因此当使用导出的 `uni` 对象时，这些方法并没有被 Promise 化，而是相当于直接调用原方法：

```ts
import { uni } from 'uniapp-promisify'

// uni.createAnimation 不是异步的
const animation = uni.createAnimation()
//     ^? UniNamespace.Animation
```

## 许可证

本项目使用 AGPL-3.0 许可证 - 有关详细信息，请参阅 [LICENSE](./LICENSE) 文件。
