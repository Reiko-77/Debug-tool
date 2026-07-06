import { AlertTriangle, ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";
import type { Diagnostic, Seller } from "@/types";
import { statusClass } from "./status";

interface DiagnosticSummaryProps {
  seller: Seller;
  diagnostic: Diagnostic;
  onOpenBlockedDetail: () => void;
}

export function DiagnosticSummary({ seller, diagnostic, onOpenBlockedDetail }: DiagnosticSummaryProps) {
  return (
    <section className="diagnostic-card">
      <div className="diagnostic-head">
        <div>
          <p className="eyebrow">One-page diagnosis</p>
          <h2>{seller.name} · current blocker: {diagnostic.blockedStage}</h2>
        </div>
        <span className={statusClass(seller.status)}>{seller.status}</span>
      </div>
      <div className="diagnostic-grid">
        <div className="diag-item urgent">
          <ShieldAlert size={18} />
          <div>
            <span>Blocked time</span>
            <strong>{diagnostic.blockedSince}</strong>
          </div>
        </div>
        <div className="diag-item">
          <AlertTriangle size={18} />
          <div>
            <span>Blocking Reason</span>
            <strong>{diagnostic.reason}</strong>
          </div>
        </div>
        <div className="diag-item">
          <CheckCircle2 size={18} />
          <div>
            <span>Blocked Stage</span>
            <strong>{diagnostic.blockedStage}</strong>
          </div>
        </div>
      </div>
      <div className="next-action">
        <span>Diagnosis focus: identify the blocked stage, blocked time, and business reason before drilling into raw Detail.</span>
        <button onClick={onOpenBlockedDetail}>
          Open {diagnostic.blockedStage} Detail
          <ArrowRight size={14} />
        </button>
      </div>
      <div className="data-health">{diagnostic.dataHealth}</div>
    </section>
  );
}
