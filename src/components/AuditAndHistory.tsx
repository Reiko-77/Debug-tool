import { ExternalLink } from "lucide-react";
import type { AuditNode, HistoryItem } from "@/types";
import { reviewStatusLabel, statusClass } from "./status";

interface AuditAndHistoryProps {
  auditNodes: AuditNode[];
  historyItems: HistoryItem[];
}

export function AuditAndHistory({ auditNodes, historyItems }: AuditAndHistoryProps) {
  return (
    <section className="audit-history-grid">
      <div className="panel">
        <div className="panel-title-row">
          <div>
            <p className="eyebrow">QA Tool</p>
            <h3>审核 DAG</h3>
          </div>
          <button className="ghost-link">
            Open QA Tool
            <ExternalLink size={13} />
          </button>
        </div>
        <div className="dag-canvas">
          {auditNodes.map((node, index) => (
            <div className={`dag-node ${node.status}`} key={node.id} style={{ marginLeft: index * 28 }}>
              <strong>{node.title}</strong>
              <span className={statusClass(node.status)}>{reviewStatusLabel(node.status)}</span>
              <small>{node.result}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panel-title-row">
          <div>
            <p className="eyebrow">Thunder</p>
            <h3>完整历史</h3>
          </div>
          <button className="ghost-link">
            Open Thunder
            <ExternalLink size={13} />
          </button>
        </div>
        <div className="history-list">
          {historyItems.map((item) => (
            <div className="history-item" key={`${item.time}-${item.title}`}>
              <span className={`history-dot ${item.status}`} />
              <div>
                <strong>{item.title}</strong>
                <p>{item.note}</p>
              </div>
              <time>{item.time}</time>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
