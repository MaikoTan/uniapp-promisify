import { promisify } from 'uniapp-promisify'
import { expectType } from 'ts-expect'

;(async () => {
  // promisify single function
  const getSystemInfo = promisify(uni.getSystemInfo)
  expectType<UniApp.GetSystemInfoResult>(await getSystemInfo())

  const chooseImage = promisify(uni.chooseImage)
  expectType<UniApp.ChooseImageSuccessCallbackResult>(await chooseImage())
  await chooseImage({ count: 1 })
  await chooseImage({ crop: { height: 500, width: 500 } })
  // @ts-expect-error
  await chooseImage({ foo: 'bar' })

  // promisify the whole uni object
  const pUni = promisify(uni)
  expectType<UniApp.GetSystemInfoResult>(await pUni.getSystemInfo())
  expectType<UniApp.ChooseImageSuccessCallbackResult>(await pUni.chooseImage())
  await pUni.chooseImage({ count: 1 })
  await pUni.chooseImage({ crop: { height: 500, width: 500 } })
  // @ts-expect-error
  await pUni.chooseImage({ foo: 'bar' })
})()
