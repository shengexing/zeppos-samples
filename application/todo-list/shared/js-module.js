export function isHmUIDefined() {
  return typeof hmUI !== 'undefined'
}

/**
 * 返回 hmBle 是否被定义
 * @returns hmBle BLE 通信模块
 */
export function isHmBleDefined() {
  return typeof hmBle !== 'undefined'
}

export function isHmTimerDefined() {
  return typeof timer !== 'undefined'
}

export function isHmFsDefined() {
  return typeof hmFS !== 'undefined'
}

export function isHmAppDefined() {
  return typeof hmApp !== 'undefined'
}

export function isHmSensorDefined() {
  return typeof hmSensor !== 'undefined'
}

export function isHmSettingDefined() {
  return typeof hmSetting !== 'undefined'
}
