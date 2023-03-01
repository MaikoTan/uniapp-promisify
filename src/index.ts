export function promisify<Option extends { success?: (...args: any[]) => any; fail?: (...args: any[]) => any }>(
  fn: (options: Option) => void,
) {
  return (
    options: Omit<Option, 'success' | 'fail'>,
  ): Promise<Option extends { success?: (res: infer Res) => void } ? Res : unknown> => {
    return new Promise<any>((resolve, reject) => {
      fn({
        ...(options as any),
        success: (res: any) => resolve(res),
        fail: (err: any) => reject(err),
      })
    })
  }
}
