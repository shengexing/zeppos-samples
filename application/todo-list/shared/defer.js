/**
 * 推迟
 * @returns object defer
 */
export function Deferred() {
  const defer = {}

  // resolve - 解决，reject - 拒绝
  defer.promise = new Promise(function (resolve, reject) {
    defer.resolve = resolve
    defer.reject = reject
  })

  return defer
}

/**
 * 推迟 ms 毫秒后解决
 * @param {Number} ms 毫秒数
 * @returns Promise
 */
export function delay(ms) {
  const defer = Deferred()

  setTimeout(defer.resolve, ms)

  return defer.promise
}

/**
 * 超时执行
 * @param {Number} ms 毫秒数
 * @param {object} cb 操作
 * @returns Promise
 */
export function timeout(ms, cb) {
  const defer = Deferred()
  // 至少 1s
  ms = ms || 1000

  const wait = setTimeout(() => {
    // 清除之前的定时器（开启一个新的定时器必须清除之前的定时器。）
    clearTimeout(wait)

    if (cb) {
      cb && cb(defer.resolve, defer.reject)
    } else {
      defer.reject('Timed out in ' + ms + 'ms.')
    }
  }, ms)

  return defer.promise
}
