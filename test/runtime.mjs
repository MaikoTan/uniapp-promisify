/**
 * Runtime regression tests.
 *
 * These run against `dist/` in plain Node, which doubles as a check that importing the
 * package does not require the `uni` global to exist yet.
 */
import assert from 'node:assert/strict'

const mod = await import('uniapp-promisify')

// Importing must not throw even though `uni` is not defined yet.
assert.ok(mod.uni, 'exports a `uni` namespace')
assert.equal(typeof mod.promisify, 'function')

globalThis.uni = {
  getSystemInfo: (options) => options.success({ platform: 'devtools' }),
  failing: (options) => options.fail({ errMsg: 'nope' }),
  $emit: () => 'emitted',
}

const { promisify, uni } = mod

// resolves via `success`
await promisify((options) => options.success({ ok: true }))()
// rejects via `fail`
await promisify((options) => options.fail(new Error('boom')))().then(
  () => assert.fail('should reject'),
  () => {},
)

// forwards extra arguments
const withRest = promisify(function (options, a, b) {
  options.success({ a, b })
})
assert.deepEqual(await withRest({}, 1, 2), { a: 1, b: 2 })

// a synchronous throw becomes a rejection instead of leaving the promise pending
await promisify(() => {
  throw new Error('sync')
})().then(
  () => assert.fail('should reject'),
  (err) => assert.equal(err.message, 'sync'),
)

// does not mutate the caller's options object
const original = { count: 3 }
promisify((options) => options.success(1))(original)
assert.deepEqual(original, { count: 3 })

// preserves a caller-supplied `complete`
let completed = false
await promisify((options) => {
  options.success(1)
  options.complete()
})({
  complete: () => {
    completed = true
  },
})
assert.equal(completed, true, 'caller `complete` still runs')

// resolves `uni.X` at call time, so late definitions work
assert.equal((await uni.getSystemInfo()).platform, 'devtools')
globalThis.uni.getSystemInfo = (options) => options.success({ platform: 'patched' })
assert.equal((await uni.getSystemInfo()).platform, 'patched', 'API replaced after import')

// synchronous APIs are still passed through
assert.equal(uni.$emit('event'), 'emitted')

console.log('All runtime tests passed.')