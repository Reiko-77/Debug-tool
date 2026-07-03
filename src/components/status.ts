import type { ReviewStatus, SellerStatus } from "@/types";

export function reviewStatusLabel(status: ReviewStatus) {
  const labels: Record<ReviewStatus, string> = {
    pass: "Pass",
    reject: "Rejected",
    pending: "Pending",
    skipped: "Skipped",
  };
  return labels[status];
}

export function statusClass(status: ReviewStatus | SellerStatus) {
  const normalized = status.toLowerCase().replace(" ", "-");
  return `status-pill status-${normalized}`;
}
