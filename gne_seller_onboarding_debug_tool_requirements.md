# GNE Seller Onboarding Debug Tool 优化需求梳理

## 1. 背景

GNE seller onboarding 目前主要依赖 Pearl 中的 case tracking 工具排查商家 onboarding 卡点。除此之外，用户还会在不同场景下跳转到 QA tool、Bits、Thunder 等工具补充信息：

- Case tracking：核心入口，用于搜索 seller、查看 seller 基础信息、onboarding process、seller actions、TTS reviews、detail、comments、allowlist 等。
- QA tool：查询审核任务和审核节点 DAG，确认具体 moderation task、节点状态、logid、reject/pass 等信息。
- Bits：当 case tracking 的 detail 图片不可用时，用接口 `GetLatestOnboardSnapshot` 和 `MGetFileURL` 手动查询资料文件 URL。
- Thunder：旧工具，用于快速查看较完整的历史节点，但命名工程化、可读性较差。

本次需求目标不是重新设计实现方案，而是先从使用者视角梳理当前工具存在的问题和可优化需求。

## 2. 核心问题梳理

### 2.1 卡点判断不够直观

用户能看到 onboarding process 中的节点状态，但很难一眼理解：

- 当前真正阻塞的节点是哪一个。
- 节点之间的先后顺序和依赖关系是什么。
- 多个 reject code 出现时，谁先拒绝、谁后拒绝。
- seller action 和 TTS review 之间的对应关系是什么。
- 历史节点、当前节点、已结束节点、被跳过节点之间的区别。

### 2.2 拒绝原因缺少可解释性

现状更多展示 reject message 或节点状态，但用户仍需要知道：

- 每次拒绝对应商家提交了什么资料。
- 违反了哪条具体规则或条例。
- 拒绝是机器、人工、第三方，还是风控/审核系统给出的。
- 拒绝 code 与业务含义之间的映射。
- 不同 reject code 之间是否互相影响。

### 2.3 Detail 可读性差

用户反馈 `Case tracking details` 理解成本高。结合截图，可能问题包括：

- 字段多但缺少业务分组，例如个人信息、店铺信息、提交文件、审核结果、系统 metadata 混在一起。
- 字段名偏后端或接口语言，例如 `local/corporation`、`New Seller Probation Status`、`LLM Fake ID/Doc Premoderation` 等缺少解释。
- 关键字段没有高亮，例如最终结论、失败原因、证据材料、处理建议。
- 节点详情之间缺少统一模板，不同 review 的展示逻辑可能不一致。

### 2.4 图片/资料查看链路断裂

从反馈看，case tracking 的 detail 中有时图片链接不可打开，需要用户跳到 Bits：

- 用户要手动复制 seller ID。
- 调 `GetLatestOnboardSnapshot` 找到文件 ID。
- 再调 `MGetFileURL` 获取文件 URL。
- 再打开文件链接查看图片。

这说明核心工具没有稳定承载“查看提交资料/证据”的能力，导致排查效率低且容易出错。

### 2.5 多工具信息重复但不一致

Case tracking、QA tool、Thunder 都能看流程/节点，但侧重点不同：

- Case tracking 更接近业务视角，但 detail 不够清楚。
- QA tool 能看审核 DAG，但偏工程化。
- Thunder 历史更完整，但可读性更差。

用户会困惑：哪个工具结果更权威？为什么 Thunder 中的流程和 mastersheet 理解不符？sentry、jumio 等节点到底对应业务里的哪一步？

### 2.6 无法批量排查

当前主要是单 seller 查询。用户反馈“只能一个一个输入”，对于运营、治理、问题排查场景效率低：

- 无法批量输入多个 seller ID。
- 无法批量导出状态、卡点、拒绝原因。
- 无法按异常类型聚合，例如同一 reject code、同一审核节点失败。
- 无法快速识别一批 seller 中需要人工介入的优先级。

## 3. 优化需求清单

### R1. 一页式诊断摘要

优先级：P0

目标：用户打开 seller 后，先看到结论，而不是自己从多个节点里推理。

需求：

- 展示当前状态、当前卡点、最新失败节点、失败时间、失败原因、责任方、下一步建议。
- 对 `Rejected` seller，必须直接说明导致 rejected 的节点和原因。
- 对数据不完整的情况，标记“部分数据加载失败”，避免用户误判。

示意图：

```text
┌────────────────────────────────────────────────────┐
│ Seller: Sovereign Commerce     Status: Rejected     │
├────────────────────────────────────────────────────┤
│ 当前卡点：KYB/KYC Vendor                            │
│ 最新失败：2026-05-21 05:55:56                       │
│ 失败原因：证件信息与注册信息不一致                   │
│ 责任方：Seller / Vendor                             │
│ 下一步：请商家重新上传有效证件，查看 Detail 证据       │
└────────────────────────────────────────────────────┘
```

验收点：

- 用户不用点 Detail，也能判断当前 seller 为什么卡住。
- Rejected 状态必须能追溯到具体拒绝节点。

### R2. 可解释 Onboarding 时间线

优先级：P0

目标：把 `Seller actions`、`TTS reviews`、历史审核节点串起来，让用户看清顺序、状态和阻塞点。

需求：

- 展示节点顺序、状态、开始/结束时间、责任方、耗时。
- 标记当前阻塞点、最新拒绝点、跳过原因。
- 支持按“业务流程”和“时间顺序”切换。

示意图：

```text
Pre Check ──> Pre KYC/KYB ──> KYB/KYC Vendor ──> TCS Review
  Pass          Pass              Rejected          Skipped
  05:53         05:53             05:55             RCS medium risk

                                  ↑ 当前阻塞点
```

验收点：

- 用户能看出谁先发生、谁后发生。
- 用户能区分历史失败、当前卡点、被跳过节点。

### R3. Detail 统一结构

优先级：P0

目标：把 Detail 从“原始字段堆叠”改成业务可读的审核详情。

需求：

- 所有 Detail 使用统一模板：结论、时间、审核方、失败原因、提交资料、证据、系统信息。
- Detail 必须有加载态、空状态、错误态和关闭入口。
- 点击后不能无响应；没有数据也要说明原因。

示意图：

```text
┌──────────────────────── Detail: KYB/KYC Vendor ─────┐
│ 结论：Rejected        审核方：Vendor                 │
│ 时间：2026-05-21 05:55:56                            │
├──────────────────────────────────────────────────────┤
│ 拒绝原因                                             │
│ Code: xxx                                            │
│ 解释：证件信息与注册信息不一致                         │
├──────────────────────────────────────────────────────┤
│ 商家提交资料                                         │
│ [身份证图片] [地址证明] [营业执照]                     │
├──────────────────────────────────────────────────────┤
│ 系统信息：Task ID / Log ID / Raw Payload     [展开]   │
└──────────────────────────────────────────────────────┘
```

验收点：

- 每个 Detail 都能明确展示“有内容 / 无数据 / 无权限 / 加载失败”。
- 普通运营默认看到业务解释，工程信息默认折叠。

### R4. 拒绝原因与规则解释

优先级：P0

目标：让用户看到 reject code、风险等级、节点名时，知道它是什么意思以及该怎么处理。

需求：

- 给 reject code、节点名、系统名、风险等级提供解释。
- 解释触发规则、业务含义、商家动作、内部处理动作。
- 补充 ACCU、CCCU、RCS、KYB/KYC、LLM Fake ID/Doc Premoderation 等术语解释。

示意图：

```text
Reject Code: KYB_DOC_MISMATCH   [?]

┌────────────────────────────────────────────┐
│ 业务含义：提交证件与注册主体信息不一致       │
│ 触发规则：KYB vendor identity check         │
│ 商家动作：重新上传有效证件或营业执照         │
│ 内部动作：无需 allowlist，走资料重提         │
│ 规则文档：Open rules doc                    │
└────────────────────────────────────────────┘
```

验收点：

- 用户无需再去问 code 是什么意思。
- 每个高频拒绝原因都有对应的处理建议。

### R5. 图片和资料内置查看

优先级：P0

目标：用户在 case tracking 内直接看提交资料，不再跳 Bits 手动查 file ID 和 URL。

需求：

- Detail 内直接展示证件、地址证明、营业执照、商品图等资料。
- 图片打不开时自动 fallback，并说明失败原因。
- 支持复制 file ID、复制图片 URL、下载文件。
- 对敏感资料保留权限控制和访问日志。

示意图：

```text
┌────────────── 提交资料 / Evidence ──────────────┐
│ 身份证正面       地址证明         营业执照        │
│ [ Preview ]     [ Preview ]     [ Preview ]     │
│ Copy File ID    Copy URL        Download        │
├────────────────────────────────────────────────┤
│ 图片加载失败：URL expired              [重试]    │
└────────────────────────────────────────────────┘
```

验收点：

- 用户不需要打开 Bits 即可查看资料。
- 图片失败时不是空白，而是明确说明原因和下一步。

### R6. 整合 QA Tool 和 Thunder 信息

优先级：P1

目标：减少跨工具跳转，把主排查信息收敛到 case tracking。

需求：

- 内嵌 QA tool 的审核 DAG，展示 moderation task 和节点状态。
- 内嵌 Thunder 的完整历史，展示历史 review 节点。
- 工程节点需要翻译成业务名称，并保留跳转到原工具的入口。

示意图：

```text
┌──────── Audit DAG / QA Tool ────────┐  ┌──── History / Thunder ────┐
│ task_id: 123456                     │  │ 05-11 Pre Check Pass       │
│ fraud_vendor_verification Reject    │  │ 05-20 Pre KYC Medium       │
│ document_check Pass                 │  │ 05-21 Vendor Reject        │
│ human_review Skipped                │  │ 05-21 TCS Skipped          │
│ [Open QA Tool]                      │  │ [Open Thunder]             │
└─────────────────────────────────────┘  └───────────────────────────┘
```

验收点：

- 用户不用频繁打开 QA tool 和 Thunder 也能完成主链路判断。
- 需要深挖时，可以一键跳到原工具。

### R7. 批量查询和导出

优先级：P1

目标：支持运营批量排查 seller onboarding 问题。

需求：

- 支持粘贴多个 seller ID 或上传 CSV。
- 批量返回状态、卡点、拒绝原因、最近更新时间、建议动作、owner。
- 支持导出 CSV/Excel，并按问题类型聚合。

示意图：

```text
┌──────────── Batch Query ────────────┐
│ Input seller IDs / Upload CSV        │
│ [749xxx, 749yyy, 749zzz]     [Run]   │
├─────────────────────────────────────┤
│ Seller ID | Status | Blocked Stage | Reason | Action │
│ 749xxx    | Reject | KYB Vendor    | Doc mismatch | Reupload │
│ 749yyy    | Active | -             | -            | -        │
│ 749zzz    | Pending| TCS Review    | Waiting      | Follow   │
│ [Export CSV] [Group by reason]       │
└─────────────────────────────────────┘
```

验收点：

- 用户可以一次排查多个 seller。
- 用户可以快速筛选同类失败原因并导出跟进。

## 4. 建议页面结构

```text
┌──────────────── Search ────────────────────────────────┐
├──────────────── Diagnostic Summary ───────────────────┤
├──────────────── Seller Basic Info ────────────────────┤
├──────────────── Onboarding Timeline ──────────────────┤
├──── Review Detail ────┬──── Evidence ─────┬───────────┤
├──── Audit DAG ────────┬──── History ──────┬───────────┤
├──────────────── Batch Query / Export ─────────────────┤
└───────────────────────────────────────────────────────┘
```

默认原则：

- 先展示结论，再展示证据，最后展示系统字段。
- 普通用户看业务解释，工程信息默认折叠。
- 主链路尽量不依赖跳转到其他工具。
