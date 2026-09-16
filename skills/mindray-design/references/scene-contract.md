# Scene contract

Every scene record should include:

```yaml
id: device-flow
question: 数据如何从设备进入临床平台？
type: FLOW
hero: eGateway
layers:
  L0: 设备数据采集基本逻辑
  L1: [医疗设备, eGateway, mi-ICU]
  L2: node detail drawer
  L3: source screenshot or protocol evidence
source: sources/6.mi-ICU设备采集介绍.pdf
```

`question`, `hero`, and `source` are required. If `L3` is not available, say so in the scene notes. Do not invent a metric, product behavior, or protocol name to make a scene feel complete.
