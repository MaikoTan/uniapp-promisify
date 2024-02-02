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

English | [简体中文](https://github.com/MaikoTan/uniapp-promisify/blob/master/README.zh-CN.md)

## Motivation

The official API of UniApp is using the old school callback style, although the `Promise` way is supported in the latest version of UniApp, the creepy official API types are not updated yet. The most goddamn thing is that the official "Promisify" method [behaves differently in Vue 2 and Vue 3](https://uniapp.dcloud.net.cn/api/#vue-2-%E5%92%8C-vue-3-%E7%9A%84-api-promise-%E5%8C%96), which is really annoying.

Instead of handling multiple platforms with many conditions and type conversions, this package is a simple wrapper of the callback style official API, which converts the callback style to the `Promise` style, and automatically infers the return type.

## Install

```bash
npm install uniapp-promisify
# Or use yarn
yarn add uniapp-promisify
```

## Usage

```ts
import { promisify } from 'uniapp-promisify'

// Promisify a single function
const login = promisify(uni.login)
const res = await login()
//     ^? UniNamespace.LoginRes

// Or you could promisify the whole `uni` global object
const pUni = promisify(uni)
const res = await pUni.login()
//     ^? UniNamespace.LoginRes
```

The ideal way to use this package is create a file exports the promisified `uni` object:

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

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE](./LICENSE) file for details.
