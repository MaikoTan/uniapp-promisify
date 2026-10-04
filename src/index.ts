import type { UniCallbackLikeOption } from './filters'

export * as uni from './p-uni'

type PromisifyResult<Option> = Option extends { success?: (res: infer Res) => void } ? Res : void

type PromisifyArgs<Option extends UniCallbackLikeOption, Rest extends any[]> = (
  options?: Omit<Option, 'success' | 'fail' | 'complete'>,
  ...rest: Rest
) => Promise<PromisifyResult<Option>>

type PromisifyFunction<Option extends UniCallbackLikeOption, Rest extends any[] = []> = PromisifyArgs<
  Option,
  Rest
>

/**
 * Promisify UniApp APIs that can be promisified.
 * @template {Function} T
 * @param {T} fn - The function to be promisified.
 * @returns The promisified function.
 */
export function promisify<
  Options extends UniCallbackLikeOption,
  Rest extends any[] = [],
  Fn extends (options: Options, ...rest: Rest) => any = (options: Options, ...rest: Rest) => any,
>(fn: Fn): PromisifyFunction<Parameters<Fn>[0], Rest> {
  return (options?: any, ...rest: Rest) => {
    return new Promise<any>((resolve, reject) => {
      // A caller-supplied `complete` runs for both outcomes, so it is preserved rather
      // than overwritten. It is invoked after the promise settles.
      const userComplete = options?.complete
      const settle = (arg?: any) => {
        resolve(arg)
        userComplete?.(arg)
      }
      const userFail = options?.fail

      try {
        fn(
          {
            ...(options as any),
            success: (res: any) => resolve(res),
            fail: (err: any) => {
              // Let the caller observe the failure through its own `fail` handler too.
              userFail?.(err)
              reject(err)
            },
            ...(userComplete ? { complete: settle } : null),
          },
          ...rest,
        )
      } catch (err) {
        // Uni APIs may throw synchronously (e.g. invalid arguments); surface that as a
        // rejection instead of an uncaught exception that would leave the promise pending.
        reject(err)
      }
    }) as any
  }
}
