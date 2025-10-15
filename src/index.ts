import type { UniCallbackLikeOption } from './filters'

export * as uni from './p-uni'

type PromisifyFunction<Option extends UniCallbackLikeOption> = (
  options?: Omit<Option, 'success' | 'fail' | 'complete'>,
) => Promise<Option extends { success?: (res: infer Res) => void } ? Res : void>

/**
 * Promisify UniApp APIs that can be promisified.
 * @template {Function} T
 * @param {T} fn - The function to be promisified.
 * @returns {PromisifyFunction<Parameters<T>[0]>} The promisified function.
 */
export function promisify<Option extends { success?: (...args: any[]) => void; fail?: (...args: any[]) => void }>(
  fn: (options: Option) => void,
): PromisifyFunction<Option> {
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
