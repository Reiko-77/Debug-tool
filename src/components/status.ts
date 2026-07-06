import type { ReviewStatus, SellerStatus } from "@/types";

export function reviewStatusLabel(status: ReviewStatus) {
  const labels: Record<ReviewStatus, string> = {
    pass: "Pass",
    reject: "Failed",
    pending: "Pending",
    skipped: "Skipped",
    unknown: "Unknown",
    "no-detail": "No Detail",
  };
  return labels[status];
}

export function reviewStatusDescription(status: ReviewStatus) {
  const descriptions: Record<ReviewStatus, string> = {
    pass: "节点已通过，当前没有阻塞。",
    reject: "节点审核失败，是需要排查的异常状态。",
    pending: "节点仍在等待上游、队列或人工处理。",
    skipped: "节点按规则跳过，需查看跳过原因。",
    unknown: "当前数据不足以判断真实状态。",
    "no-detail": "节点存在但 Detail 暂无有效内容。",
  };
  return descriptions[status];
}

export function statusClass(status: ReviewStatus | SellerStatus) {
  const normalized = status.toLowerCase().replace(" ", "-");
  return `status-pill status-${normalized}`;
}
