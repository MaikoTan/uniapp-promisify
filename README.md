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

English | [简体中文](https://github.com/MaikoTan/uniapp-promisify/blob/master/README.zh-CN.md)

## Motivation

The official API of UniApp is using the Stone Age callback style, although `Promise` is already supported by several APIs in the latest version of UniApp, the creepy official API types are synchronized as well. And the most goddamn thing is that the official "Promisify" method even [behaves differently in Vue 2 and Vue 3](https://uniapp.dcloud.net.cn/api/#vue-2-%E5%92%8C-vue-3-%E7%9A%84-api-promise-%E5%8C%96), which is really mad.

In other words, FXXK U DCloud!

Instead of handling multiple platforms with many conditions and type conversions, this package behaves as a simple wrapper for the official callback APIs, converting those callback functions to be the `resolve` and `reject` in `Promise`, and also automatically infers the types of return values.

## Install

```bash
npm install uniapp-promisify
# Or use yarn
yarn add uniapp-promisify
# Or use pnpm
pnpm i uniapp-promisify
```

## Usage

`uniapp-promisify` exports a function called `promisify` which can be used in the following ways:

- Promisify a single function.

```ts
import { promisify } from 'uniapp-promisify'

const login = promisify(uni.login)
const res = await login()
//     ^? UniNamespace.LoginRes
```

- Promisify the whole `uni` global object.

```ts
import { promisify } from 'uniapp-promisify'

const pUni = promisify(uni)
const res = await pUni.login()
//     ^? UniNamespace.LoginRes
```

- Use the `uni` object directly from `uniapp-promisify`, which is already promisified.

```ts
import { uni } from 'uniapp-promisify'

const res = await uni.login()
//     ^? UniNamespace.LoginRes
```

## Synchronous API

Since there are some cases where asynchronous calls are not allowed, when using the promisified `uni` global object, you can use the `uni.sync` property to map to the original `uni` object that has not been wrapped.

```ts
import { uni } from 'uniapp-promisify'

// uni.getUserProfile() can only be called in synchronous functions
const res = uni.sync.getUserProfile()
```

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE](./LICENSE) file for details.
