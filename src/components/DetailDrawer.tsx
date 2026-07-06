import { ChevronDown, X } from "lucide-react";
import type { ReviewDetail } from "@/types";
import { EvidenceGrid } from "./EvidenceGrid";
import { reviewStatusLabel, statusClass } from "./status";

interface DetailDrawerProps {
  detail?: ReviewDetail;
  open: boolean;
  onClose: () => void;
}

export function DetailDrawer({ detail, open, onClose }: DetailDrawerProps) {
  return (
    <>
      <div className={open ? "drawer-mask visible" : "drawer-mask"} onClick={onClose} />
      <aside className={open ? "detail-drawer open" : "detail-drawer"} aria-hidden={!open}>
        {!detail ? (
          <div className="drawer-empty">请选择一个节点查看 Detail。</div>
        ) : (
          <>
            <header className="drawer-head">
              <div>
                <p className="eyebrow">Review Detail</p>
                <h2>{detail.title}</h2>
              </div>
              <button className="icon-btn" onClick={onClose} aria-label="Close detail">
                <X size={18} />
              </button>
            </header>

            <section className="drawer-section result-section">
              <div className="result-row">
                <span className={statusClass(detail.result)}>{reviewStatusLabel(detail.result)}</span>
                <span>{detail.reviewer}</span>
              </div>
              <div className="field-grid">
                <Field label="Start time" value={detail.startTime} />
                <Field label="End time" value={detail.endTime} />
                <Field label="Reject code" value={detail.rejectCode || "-"} />
              </div>
            </section>

            <section className="drawer-section">
              <h3>拒绝原因与规则解释</h3>
              <div className="reason-card">
                <strong>{detail.reason || "暂无拒绝原因"}</strong>
                <p>{detail.nextAction || "当前无需额外操作。"}</p>
                {detail.emptyState && <p className="empty-explain">{detail.emptyState}</p>}
              </div>
            </section>

            <section className="drawer-section">
              <h3>审核记录拆分</h3>
              {detail.attempts.length ? (
                <div className="attempt-list">
                  {detail.attempts.map((attempt) => (
                    <article className="attempt-card" key={`${attempt.time}-${attempt.source}`}>
                      <div className="attempt-head">
                        <strong>{attempt.time}</strong>
                        <span className={statusClass(attempt.result)}>{reviewStatusLabel(attempt.result)}</span>
                      </div>
                      <p>{attempt.source} · {attempt.reason}</p>
                      <div className="system-grid">
                        {Object.entries(attempt.keyFields).map(([label, value]) => (
                          <Field label={label} value={value} key={label} />
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-state">{detail.emptyState || "该节点暂无审核记录。"}</div>
              )}
            </section>

            <section className="drawer-section">
              <h3>商家提交资料</h3>
              <EvidenceGrid files={detail.evidence} />
            </section>

            <section className="drawer-section">
              <button className="system-toggle">
                系统信息
                <ChevronDown size={14} />
              </button>
              <div className="system-grid">
                {Object.entries(detail.systemFields).map(([label, value]) => (
                  <Field label={label} value={value} key={label} />
                ))}
              </div>
            </section>
          </>
        )}
      </aside>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="field">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
