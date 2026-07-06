export type SellerStatus = "Active" | "Rejected" | "Pending" | "In Review";
export type ReviewStatus = "pass" | "reject" | "pending" | "skipped" | "unknown" | "no-detail";
export type EvidenceStatus = "available" | "expired" | "missing";

export interface RequirementModule {
  id: string;
  title: string;
  demoSurface: string;
  acceptance: string;
}

export interface Seller {
  id: string;
  name: string;
  status: SellerStatus;
  shopLevel: string;
  sellerType: string;
  companyName: string;
  code: string;
  violationScore: number;
  probationStatus: string;
  invitedLabel: string;
  region: string;
  createTime: string;
}

export interface Diagnostic {
  blockedStage: string;
  blockedSince: string;
  reason: string;
  owner: string;
  nextAction: string;
  dataHealth: string;
}

export interface TimelineNode {
  id: string;
  name: string;
  status: ReviewStatus;
  owner: string;
  startTime: string;
  endTime?: string;
  description?: string;
  latestReviewTime: string;
  reason: string;
  detailAvailable: boolean;
  noDetailReason?: string;
  source: "Case Tracking" | "TTS Review" | "QA Tool" | "Thunder";
  isCurrentBlocker?: boolean;
}

export interface SellerAction {
  id: string;
  title: string;
  status: Extract<ReviewStatus, "pass" | "reject" | "pending">;
  time: string;
  detailNodeId: string;
  note: string;
}

export interface EvidenceFile {
  id: string;
  type: string;
  name: string;
  status: EvidenceStatus;
  previewText: string;
  failureReason?: string;
  fallback?: string;
}

export interface ReviewAttempt {
  time: string;
  source: string;
  result: ReviewStatus;
  keyFields: Record<string, string>;
  reason: string;
}

export interface ReviewDetail {
  nodeId: string;
  title: string;
  result: ReviewStatus;
  reviewer: string;
  startTime: string;
  endTime: string;
  rejectCode?: string;
  reason?: string;
  nextAction?: string;
  emptyState?: string;
  attempts: ReviewAttempt[];
  evidence: EvidenceFile[];
  systemFields: Record<string, string>;
}

export interface AuditNode {
  id: string;
  title: string;
  status: ReviewStatus;
  result: string;
  taskId: string;
  next?: string[];
  isException?: boolean;
}

export interface HistoryItem {
  attempt: string;
  time: string;
  endTime?: string;
  title: string;
  status: ReviewStatus;
  source: "Historical" | "Current";
  note: string;
}

export interface BatchResult {
  sellerId: string;
  status: SellerStatus;
  blockedStage: string;
  reason: string;
  action: string;
}
