import { AlertCircle, CheckCircle2, Clock3 } from "lucide-react";
import type { SellerAction } from "@/types";
import { reviewStatusLabel, statusClass } from "./status";

interface SellerActionsProps {
  actions: SellerAction[];
  onOpenDetail: (nodeId: string) => void;
}

const iconMap = {
  pass: CheckCircle2,
  reject: AlertCircle,
  pending: Clock3,
};

export function SellerActions({ actions, onOpenDetail }: SellerActionsProps) {
  return (
    <section className="panel seller-actions-panel">
      <div className="panel-title-row">
        <div>
          <p className="eyebrow">Case Tracking original section</p>
          <h3>Seller actions</h3>
        </div>
        <div className="allowlist-actions">
          <button>Add seller allowlist</button>
          <button>Add product allowlist</button>
        </div>
      </div>
      <div className="seller-action-list">
        {actions.map((action) => {
          const Icon = iconMap[action.status];
          return (
            <article className="seller-action-item" key={action.id}>
              <Icon size={18} />
              <div>
                <strong>{action.title}</strong>
                <p>{action.note}</p>
                <span>{action.time}</span>
              </div>
              <span className={statusClass(action.status)}>{reviewStatusLabel(action.status)}</span>
              <button onClick={() => onOpenDetail(action.detailNodeId)}>Detail</button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
