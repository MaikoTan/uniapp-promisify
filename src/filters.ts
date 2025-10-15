/*
 * This file is used for type extraction in `extract-methods.ts`. It is not included in the
 * build output.
 */

export type UniCallbackLikeOption = Partial<Record<'success' | 'fail' | 'complete', (...args: any[]) => void>>

export type FilterPromisifiableFunction<Func> = Func extends (...args: any[]) => any
  ? 1 extends Parameters<Func>['length']
    ? Parameters<Func>[0] extends UniCallbackLikeOption
      ? true
      : false
    : false
  : false

export type PromisifiableFunctionNames = {
  [K in keyof typeof uni]: FilterPromisifiableFunction<typeof uni[K]> extends true ? K : never
}[keyof typeof uni]

export type Uni = typeof uni
