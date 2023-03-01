# uniapp-promisify

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

const login = promisify(uni.login)
const res = await login()
//     ^? UniNamespace.LoginRes: 
```

## 许可证

本项目使用 AGPL-3.0 许可证 - 有关详细信息，请参阅 [LICENSE](./LICENSE) 文件。
