/**
 * 事件总线
 * @class EventBus
 * @constructor 构造器
 */ 
export class EventBus {

  /**
   * 构造器方法：
   * 初始化一个成员变量 map<string, Array>
   */
  constructor() {
    this.map = new Map()
  }

  /**
   * 设置 type 类型的值
   * @param {string} type 成员变量 map 的 key
   * @param {object} cb 成员变量 map 的 value
   */
  on(type, cb) {
    if (this.map.has(type)) {
      this.map.get(type).push(cb)
    } else {
      this.map.set(type, [cb])
    }
  }

  /**
   * 删除 type 对应的 value，若 type 为空，则清空整个 map
   * @param {string} type 成员变量 map 的 key
   * @param {object} cb 成员变量 map 的 value
   * @returns undefined
   */
  off(type, cb) {
    if (type) {
      if (cb) {
        const cbs = this.map.get(type)

        // 若 cbs 为空就返回
        if (!cbs) return
        // 在 cbs 中找到 cb 的索引位置
        const index = cbs.findIndex((i) => i === cb)

        // index 索引值在合法范围内
        if (index >= 0) {
          // 删除 index 位置处的值
          cbs.splice(index, 1)
        }
      } else {
        this.map.delete(type)
      }
    } else {
      // 若 type 为空，则清空整个 map
      this.map.clear()
    }
  }

  /**
   * 执行 type 对应的每一个 cb 操作
   * @param {string} type 成员变量 map 的 key
   * @param  {...any} args 剩余参数
   */
  emit(type, ...args) {
    // 循环遍历 type 对应的每一个 cb
    for (let cb of this.map.get(type) ? this.map.get(type) : []) {
      cb && cb(...args)
    }
  }

  /**
   * 返回成员变量 map 中 types 对应的 cbs 的容量
   * @param {string} type 成员变量 map 的 key
   * @returns Array 成员变量 map 中 types 对应的 cbs 的容量
   */
  count(type) {
    return this.map.get(type) ? this.map.get(type).length : 0
  }
}
