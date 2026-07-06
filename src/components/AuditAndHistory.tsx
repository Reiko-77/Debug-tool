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
            <h3>审核 DAG · TaskID 流程</h3>
          </div>
          <button className="ghost-link">
            Open QA Tool
            <ExternalLink size={13} />
          </button>
        </div>
        <div className="qa-summary">
          <span>Audit status: Rejected</span>
          <span>Exception node: fraud_vendor_verification</span>
        </div>
        <div className="dag-canvas">
          {auditNodes.map((node, index) => (
            <div
              className={`dag-node ${node.status} ${node.isException ? "exception" : ""}`}
              key={node.id}
              style={{ marginLeft: index * 28 }}
            >
              <strong>{node.title}</strong>
              <span className={statusClass(node.status)}>{reviewStatusLabel(node.status)}</span>
              <small>{node.result}</small>
              <small>TaskID: {node.taskId}</small>
              <small>Next: {node.next?.join(", ") || "End"}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panel-title-row">
          <div>
            <p className="eyebrow">Thunder</p>
            <h3>Onboarding 历史与关键节点</h3>
          </div>
          <button className="ghost-link">
            Open Thunder
            <ExternalLink size={13} />
          </button>
        </div>
        <div className="history-summary">
          <span>提交次数：3</span>
          <span>Current 与 Historical 已区分</span>
        </div>
        <div className="history-list">
          {historyItems.map((item) => (
            <div className="history-item" key={`${item.time}-${item.title}`}>
              <span className={`history-dot ${item.status}`} />
              <div>
                <strong>{item.attempt} · {item.title}</strong>
                <p>{item.note}</p>
                <span className={`source-chip ${item.source.toLowerCase()}`}>{item.source}</span>
              </div>
              <time>{item.endTime ? `${item.time} - ${item.endTime}` : item.time}</time>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
