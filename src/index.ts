import Decimal from 'decimal.js'

function toRMB(num: number | string): string {
  const chineseNum: string[] = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']

  let result: string = ''
  // 转为大数
  let decimal: Decimal = new Decimal(num)
  // 处理负数
  if (decimal.lessThan(0)) {
    result += '负'
    decimal = decimal.abs()
  }

  // 分离整数和小数
  const [integerStr, decimalStr]: string[] = decimal.toFixed(2, Decimal.ROUND_DOWN).split('.')

  const decimalNum: number = Number.parseInt(decimalStr)

  // 处理整数部分
  const integerUnit: string[] = ['', '拾', '佰', '仟']
  const bigIntegerUnit: string[] = ['', '万', '亿']

  let integerPartChinese: string = ''

  if (integerStr.length === 0) {
    result += '零'
  } else {
    let zeroCount: number = 0
    for (let i = 0; i < integerStr.length; i++) {
      const index = integerStr.length - i - 1
      const unit = integerUnit[index % 4]
      const bigIndex = Math.floor(index / 4)
      let bigUnit = ''

      // 大数万万化
      bigUnit = bigIndex >= bigIntegerUnit.length ? '万'.repeat(bigIndex - 2) : bigIntegerUnit[bigIndex]

      const digit: number = Number.parseInt(integerStr[i])
      if (digit !== 0) {
        if (zeroCount > 0) {
          integerPartChinese += '零'
          zeroCount = 0
        }
        integerPartChinese += `${chineseNum[digit]}${unit}${unit === '' ? bigUnit : ''}`
      } else {
        zeroCount++
        if (!unit) {
          integerPartChinese += bigUnit
        }
      }
    }
    result += integerPartChinese
  }
  result += '元'

  // 处理小数部分
  const decimalUnit: string[] = ['角', '分']
  if (decimalNum > 0) {
    let decimalPartChinese: string = ''
    for (let i = 0; i < decimalStr.length; i++) {
      const digit = decimalStr[i]
      decimalPartChinese += `${chineseNum[Number.parseInt(digit)]}${decimalUnit[i]}`
    }
    // 此处不可能存在零角零分的情况，所以零角去掉角，零分直接去掉
    decimalPartChinese = decimalPartChinese.replace(/零角/, '零').replace(/零分/, '')
    result += decimalPartChinese
  } else {
    result += '整'
  }

  return result
}

export function strToRMB(numStr: string | null | undefined): string {
  if (typeof numStr !== 'string' || !/^-?\d*(\.\d*)?$/.test(numStr)) {
    throw new Error('Invalid number string!')
  }
  return toRMB(numStr)
}

export function numToRMB(num: number | null | undefined): string {
  if (typeof num !== 'number' || Number.isNaN(num)) {
    throw new Error('Invalid number!')
  }
  return toRMB(num)
}
