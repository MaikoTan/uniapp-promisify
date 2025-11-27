import type { UniCallbackLikeOption } from './filters'

export * as uni from './p-uni'

type PromisifyFunction<Option extends UniCallbackLikeOption, Rest extends any[] = []> = (
  options?: Omit<Option, 'success' | 'fail' | 'complete'>,
  ...rest: Rest
) => Promise<Option extends { success?: (res: infer Res) => void } ? Res : void>

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
>(
  fn: Fn
): PromisifyFunction<Parameters<Fn>[0], Rest> {
  return (options?: any, ...rest: Rest) => {
    return new Promise<any>((resolve, reject) => {
      fn({
        ...(options as any),
        success: (res: any) => resolve(res),
        fail: (err: any) => reject(err),
      }, ...rest)
    }) as any
  }
}
