import { gettext } from 'i18n'
import {
  COMMON_TITLE_TEXT,
  CALORIE_TEXT,
  CALORIE_TEXT_SIZE,
  UNIT_TEXT,
  UNIT_TEXT_SIZE,
  TOTAL_CONSUME_TEXT,
  CONSUME_ICON,
  CONSUME_ICON_WIDTH,
  ALIGN_DESC_GROUP,
  IMGAE_CALORIES_MARIN,
  CALORIES_UNIT_MARIN,
  EQUIVALENT_TO_BUTTON,
  EQUIVALENT_TO_FOOD_ICON,
  DEVICE_WIDTH,
  EQUIVALENT_MORE_X,
  EQUIVALENT_MARGIN,
  EQUIVALENT_TO_FOOD_ICON_WIDTH,
  EQUIVALENT_MORE_FOOD_ICON,
  EQUIVALENT_MORE_FOOD_NUM,
} from '../../utils/styles'
import { FOOD_CALORIES } from '../../utils/constants'
const logger = DeviceRuntimeCore.HmLogger.getLogger('calories')
const globalData = getApp()._options.globalData

Page({
  buildTopContent(calories) {
    const w1 = Math.round(
      DeviceRuntimeCore.HmUtils.measureTextWidth(
        '' + calories,
        CALORIE_TEXT_SIZE,
      ),
    )
    const w2 = Math.round(
      DeviceRuntimeCore.HmUtils.measureTextWidth(
        gettext('unit'),
        UNIT_TEXT_SIZE,
      ),
    )
    const w =
      w1 + w2 + CONSUME_ICON_WIDTH + IMGAE_CALORIES_MARIN + CALORIES_UNIT_MARIN
    const x = Math.round((DEVICE_WIDTH - w) / 2)

    const group = hmUI.createWidget(hmUI.widget.GROUP, {
      ...ALIGN_DESC_GROUP,
      x,
      w,
    })

    group.createWidget(hmUI.widget.TEXT, {
      ...CALORIE_TEXT,
      text: `${calories}`,
      x: CONSUME_ICON_WIDTH + IMGAE_CALORIES_MARIN,
      w: w1,
    })
    group.createWidget(hmUI.widget.TEXT, {
      ...UNIT_TEXT,
      x: w - w2,
      w: w2,
    })
    group.createWidget(hmUI.widget.IMG, CONSUME_ICON)
  },
  build() {
    let calories = hmSensor.createSensor(hmSensor.id.CALORIE).current // Math.floor(Math.random() * 1000)
    let currentFood = globalData.foodType

    hmUI.createWidget(hmUI.widget.TEXT, COMMON_TITLE_TEXT)
    hmUI.createWidget(hmUI.widget.TEXT, TOTAL_CONSUME_TEXT)

    this.buildTopContent(calories)

    let activeIndex = FOOD_CALORIES.findIndex(
      (item) => item.type === currentFood,
    )
    this.calculate(calories, FOOD_CALORIES[activeIndex])
    hmUI.createWidget(hmUI.widget.BUTTON, {
      ...EQUIVALENT_TO_BUTTON,
      click_func: () => {
        hmApp.gotoPage({
          file: 'page/gtr-3/foodList',
        })
      },
    })
  },
  calculate(currentCalories, foodData) {
    let { value, type } = foodData
    let count = Math.floor(currentCalories / value)
    if (count === 1 || count === 2 || count === 3) {
      let x =
        (DEVICE_WIDTH -
          EQUIVALENT_TO_FOOD_ICON_WIDTH * count -
          EQUIVALENT_MARGIN * (count - 1)) /
        2
      for (let index = 0; index < count; index++) {
        this.drawFood(
          x + (EQUIVALENT_MARGIN + EQUIVALENT_TO_FOOD_ICON_WIDTH) * index,
          type,
        ) // icon
      }
    } else {
      this.drawFood(EQUIVALENT_MORE_X, type) // icon
      hmUI.createWidget(hmUI.widget.IMG, EQUIVALENT_MORE_FOOD_ICON)
      hmUI.createWidget(hmUI.widget.TEXT, {
        ...EQUIVALENT_MORE_FOOD_NUM,
        text: `${count}`,
      })
    }
  },
  drawFood(x, type) {
    hmUI.createWidget(hmUI.widget.IMG, {
      ...EQUIVALENT_TO_FOOD_ICON,
      x: px(x),
      src: `food/${type}.png`,
    })
  },
  onReady() {},

  onShow() {},

  onHide() {},

  onDestroy() {},
})
