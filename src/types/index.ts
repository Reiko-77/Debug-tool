export type SellerStatus = "Active" | "Rejected" | "Pending" | "In Review";
export type ReviewStatus = "pass" | "reject" | "pending" | "skipped";
export type EvidenceStatus = "available" | "expired" | "missing";

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
  latestFailureTime: string;
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
  isCurrentBlocker?: boolean;
}

export interface EvidenceFile {
  id: string;
  type: string;
  name: string;
  status: EvidenceStatus;
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
  evidence: EvidenceFile[];
  systemFields: Record<string, string>;
}

export interface AuditNode {
  id: string;
  title: string;
  status: ReviewStatus;
  result: string;
}

export interface HistoryItem {
  time: string;
  title: string;
  status: ReviewStatus;
  note: string;
}

export interface BatchResult {
  sellerId: string;
  status: SellerStatus;
  blockedStage: string;
  reason: string;
  action: string;
}
