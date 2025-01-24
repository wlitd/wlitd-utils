# *wlitd-utils*
提供一部分你可能需要但找不到很好实现的工具

不定期更新（取决于作者碰到的问题以及懒惰程度）

## 安装
```bash
npm i wlitd-utils
或
pnpm i wlitd-utils
```

## 一、数字或字符串转中文大写金额（目前只有这个）

### 使用
```typescript
import { numToRMB, strToRMB } from 'wlitd-utils'

// 负壹拾贰万叁仟肆佰伍拾陆元柒角捌分
console.log(numToRMB(-123456.789))

// 壹拾贰万叁仟肆佰伍拾陆元柒角捌分
console.log(strToRMB("123456.789"))
```

### 部分问题
 1. numToRMB()
```typescript
// 当数字超过JavaScript的范围时会出现精度丢失，此时建议使用strToRMB()
numToRMB(-123450010023456789.01)
// Expected: "负壹拾贰万万叁仟肆佰伍拾万零壹佰亿零贰仟叁佰肆拾伍万陆仟柒佰捌拾玖元零壹分"
// Received: "负壹拾贰万万叁仟肆佰伍拾万零壹佰亿零贰仟叁佰肆拾伍万陆仟柒佰捌拾元整"
```

 2. strToRMB()
```typescript
// 注意无效的str 例如
null、undefined、''、'     '、'das'、'+456'、'456798a'
// 注意此为有效str，输出为：伍仟陆佰柒拾捌元整
'5678.'
```

 3. 大数建议均使用strToRMB()，并且输出为万万化金额，例如
```typescript
// 负壹拾贰万万叁仟肆佰伍拾万零壹佰亿零贰仟叁佰肆拾伍万陆仟柒佰捌拾玖元零壹分
strToRMB('-123450010023456789.01')
```
