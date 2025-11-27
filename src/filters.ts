/*
 * This file is used for type extraction in `extract-methods.ts`. It is not included in the
 * build output.
 */

export type UniCallbackLikeOption = Partial<Record<'success' | 'fail' | 'complete', (...args: any[]) => void>>

export type Uni = typeof uni
