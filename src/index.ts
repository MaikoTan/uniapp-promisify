type UniCallbackLikeOption = Partial<Record<'success' | 'fail' | 'complete', (...args: any[]) => any>>

type PromisifyFunction<Option extends UniCallbackLikeOption> = (
  options?: Omit<Option, 'success' | 'fail' | 'complete'>,
) => Promise<Option extends { success?: (res: infer Res) => void } ? Res : unknown>

type PromisifyModule<Module extends Record<string, any>> = {
  [K in keyof Module]: Module[K] extends Function
    ? Parameters<Module[K]>[0] extends UniCallbackLikeOption
      ? PromisifyFunction<Parameters<Module[K]>[0]>
      : Module[K]
    : Module[K]
} & { sync: Module }

export function promisify<Option extends { success?: (...args: any[]) => any; fail?: (...args: any[]) => any }>(
  fn: (options: Option) => void,
): PromisifyFunction<Option>
export function promisify<Module extends Record<string, any>>(module: Module): PromisifyModule<Module>
export function promisify(fn: any) {
  if (typeof fn === 'object') {
    return new Proxy(fn, {
      get(target, prop) {
        if (prop === 'sync') {
          return target
        } else if (typeof target[prop] !== 'function') {
          return target[prop]
        }
        return promisify(target[prop])
      },
    })
  } else if (typeof fn === 'function') {
    return (options: any) => {
      return new Promise<any>((resolve, reject) => {
        fn({
          ...(options as any),
          success: (res: any) => resolve(res),
          fail: (err: any) => reject(err),
        })
      })
    }
  }
}

const pUni = promisify(uni)

export {
  pUni as uni,
}
