# uniapp-promisify

[![Build](https://github.com/MaikoTan/uniapp-promisify/actions/workflows/build.yml/badge.svg)](https://github.com/MaikoTan/uniapp-promisify/actions/workflows/build.yml)

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

const login = promisify(uni.login)
const res = await login()
//     ^? UniNamespace.LoginRes: 
```

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE](./LICENSE) file for details.
