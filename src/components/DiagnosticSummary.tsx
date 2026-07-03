import { AlertTriangle, ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";
import type { Diagnostic, Seller } from "@/types";

interface DiagnosticSummaryProps {
  seller: Seller;
  diagnostic: Diagnostic;
  onOpenVendorDetail: () => void;
}

export function DiagnosticSummary({ seller, diagnostic, onOpenVendorDetail }: DiagnosticSummaryProps) {
  return (
    <section className="diagnostic-card">
      <div className="diagnostic-head">
        <div>
          <p className="eyebrow">One-page diagnosis</p>
          <h2>{seller.name} 当前被卡在 {diagnostic.blockedStage}</h2>
        </div>
        <span className="status-pill status-rejected">{seller.status}</span>
      </div>
      <div className="diagnostic-grid">
        <div className="diag-item urgent">
          <ShieldAlert size={18} />
          <div>
            <span>最新失败</span>
            <strong>{diagnostic.latestFailureTime}</strong>
          </div>
        </div>
        <div className="diag-item">
          <AlertTriangle size={18} />
          <div>
            <span>失败原因</span>
            <strong>{diagnostic.reason}</strong>
          </div>
        </div>
        <div className="diag-item">
          <CheckCircle2 size={18} />
          <div>
            <span>责任方</span>
            <strong>{diagnostic.owner}</strong>
          </div>
        </div>
      </div>
      <div className="next-action">
        <span>建议下一步：{diagnostic.nextAction}</span>
        <button onClick={onOpenVendorDetail}>
          查看 Vendor Detail
          <ArrowRight size={14} />
        </button>
      </div>
      <div className="data-health">{diagnostic.dataHealth}</div>
    </section>
  );
}
