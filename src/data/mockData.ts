import type {
  AuditNode,
  BatchResult,
  Diagnostic,
  HistoryItem,
  ReviewDetail,
  Seller,
  TimelineNode,
} from "@/types";

export const seller: Seller = {
  id: "7495790816548981510",
  name: "Sovereign Commerce",
  status: "Rejected",
  shopLevel: "Standard Seller",
  sellerType: "Local / Corporation",
  companyName: "Sovereign Commerce LLC",
  code: "USLC7VEVGK",
  violationScore: 0,
  probationStatus: "Out(Not In Yet)",
  invitedLabel: "-",
  region: "US",
  createTime: "02/06/2024 08:47:48",
};

export const diagnostic: Diagnostic = {
  blockedStage: "KYB/KYC Vendor",
  latestFailureTime: "2026-05-21 05:55:56",
  reason: "证件信息与注册主体信息不一致，Vendor 返回拒绝。",
  owner: "Seller / Vendor",
  nextAction: "请商家重新上传有效证件或营业执照，并复核注册主体名称。",
  dataHealth: "已整合 Case tracking、QA Tool 与 Thunder mock 信息。",
};

export const timelineNodes: TimelineNode[] = [
  {
    id: "pre-check",
    name: "Pre Check",
    status: "pass",
    owner: "System",
    startTime: "2026-05-21 05:53:12",
    endTime: "2026-05-21 05:53:12",
    description: "基础资格校验通过。",
  },
  {
    id: "pre-kyc",
    name: "Pre KYC/KYB",
    status: "pass",
    owner: "Risk",
    startTime: "2026-05-21 05:53:25",
    endTime: "2026-05-21 05:53:25",
    description: "RCS 风险等级 Medium，进入 Vendor 校验。",
  },
  {
    id: "vendor",
    name: "KYB/KYC Vendor",
    status: "reject",
    owner: "Vendor",
    startTime: "2026-05-21 05:55:56",
    endTime: "2026-05-21 05:55:56",
    description: "身份/主体材料匹配失败。",
    isCurrentBlocker: true,
  },
  {
    id: "tcs",
    name: "TCS review",
    status: "skipped",
    owner: "Human Review",
    startTime: "2026-05-21 05:57:46",
    description: "Skipped because seller is RCS Pre-KYC medium risk.",
  },
  {
    id: "ea",
    name: "KYB/KYC EA",
    status: "pending",
    owner: "EA",
    startTime: "2026-05-21 05:57:47",
    description: "等待 Vendor 拒绝处理完成。",
  },
];

export const details: Record<string, ReviewDetail> = {
  "pre-check": {
    nodeId: "pre-check",
    title: "Pre Check",
    result: "pass",
    reviewer: "System",
    startTime: "2026-05-21 05:53:12",
    endTime: "2026-05-21 05:53:12",
    reason: "基础资格和店铺状态校验通过。",
    nextAction: "无需处理。",
    evidence: [],
    systemFields: {
      "Task ID": "7648297952624002829",
      Scene: "onboarding_2L_US",
      Result: "pass",
    },
  },
  "pre-kyc": {
    nodeId: "pre-kyc",
    title: "Pre KYC/KYB",
    result: "pass",
    reviewer: "Risk Control",
    startTime: "2026-05-21 05:53:25",
    endTime: "2026-05-21 05:53:25",
    reason: "预审核通过，风险等级 Medium。",
    nextAction: "进入 KYB/KYC Vendor 校验。",
    evidence: [],
    systemFields: {
      "Risk Level": "Medium",
      "RCS Result": "pass",
      "Rule Version": "mock-v2026.05",
    },
  },
  vendor: {
    nodeId: "vendor",
    title: "KYB/KYC Vendor",
    result: "reject",
    reviewer: "Third-party Vendor",
    startTime: "2026-05-21 05:55:56",
    endTime: "2026-05-21 05:55:56",
    rejectCode: "KYB_DOC_MISMATCH",
    reason: "营业执照主体名称与注册主体信息不一致。",
    nextAction: "请商家重新上传有效营业执照，确保公司名称与注册信息一致。",
    evidence: [
      {
        id: "file_biz_license_001",
        type: "Biz License",
        name: "营业执照",
        status: "available",
      },
      {
        id: "file_address_002",
        type: "Proof of Address",
        name: "地址证明",
        status: "expired",
      },
      {
        id: "file_id_doc_003",
        type: "ID Document",
        name: "法人证件",
        status: "available",
      },
    ],
    systemFields: {
      "Task ID": "7648297952624002829",
      "Log ID": "20260521055556A9D2",
      IDC: "useast5",
      Env: "prod",
    },
  },
  tcs: {
    nodeId: "tcs",
    title: "TCS review",
    result: "skipped",
    reviewer: "Human Review",
    startTime: "2026-05-21 05:57:46",
    endTime: "-",
    reason: "Skipped because seller is RCS Pre-KYC medium risk.",
    nextAction: "等待 Vendor 节点处理结果。",
    evidence: [],
    systemFields: {
      "Skip Reason": "RCS Pre-KYC medium risk",
      Queue: "manual-review",
    },
  },
  ea: {
    nodeId: "ea",
    title: "KYB/KYC EA",
    result: "pending",
    reviewer: "EA",
    startTime: "2026-05-21 05:57:47",
    endTime: "-",
    reason: "等待上游 Vendor 节点完成重提。",
    nextAction: "当前无需人工介入。",
    evidence: [],
    systemFields: {
      Dependency: "KYB/KYC Vendor",
      Status: "waiting",
    },
  },
};

export const auditNodes: AuditNode[] = [
  {
    id: "risk",
    title: "fraud_res_verification",
    status: "pass",
    result: "200 - Complete",
  },
  {
    id: "algo",
    title: "fraud_algo_verification",
    status: "pass",
    result: "200 - Complete",
  },
  {
    id: "vendor",
    title: "fraud_vendor_verification",
    status: "reject",
    result: "400 - Reject",
  },
  {
    id: "identity",
    title: "identity_verification",
    status: "skipped",
    result: "100 - Terminated",
  },
];

export const historyItems: HistoryItem[] = [
  {
    time: "2026-05-11 23:30",
    title: "Pre Check",
    status: "pass",
    note: "基础校验通过",
  },
  {
    time: "2026-05-20 16:11",
    title: "Pre KYC/KYB",
    status: "pass",
    note: "Risk Level: Medium",
  },
  {
    time: "2026-05-21 05:55",
    title: "KYB/KYC Vendor",
    status: "reject",
    note: "Doc mismatch",
  },
  {
    time: "2026-05-21 05:57",
    title: "TCS review",
    status: "skipped",
    note: "RCS medium risk",
  },
];

export const batchResults: BatchResult[] = [
  {
    sellerId: "7495790816548981510",
    status: "Rejected",
    blockedStage: "KYB/KYC Vendor",
    reason: "Doc mismatch",
    action: "Reupload license",
  },
  {
    sellerId: "7494637214381212924",
    status: "Active",
    blockedStage: "-",
    reason: "-",
    action: "-",
  },
  {
    sellerId: "7494657534162273561",
    status: "Pending",
    blockedStage: "TCS Review",
    reason: "Waiting manual review",
    action: "Follow queue",
  },
];
