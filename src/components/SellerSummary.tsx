import { Copy, MessageSquare, Store } from "lucide-react";
import type { Seller } from "@/types";
import { statusClass } from "./status";

interface SellerSummaryProps {
  seller: Seller;
}

export function SellerSummary({ seller }: SellerSummaryProps) {
  return (
    <section className="seller-card">
      <div className="shop-icon">
        <Store size={38} />
      </div>
      <div className="seller-main">
        <div className="seller-title-row">
          <h2>{seller.name}</h2>
          <span className={statusClass(seller.status)}>{seller.status}</span>
          <span className="outline-tag">Shop Level: {seller.shopLevel}</span>
          <span className="outline-tag">TikTok</span>
        </div>
        <div className="seller-meta">
          <span>{seller.region}</span>
          <span>
            Shop ID: <b>{seller.id}</b> <Copy size={12} />
          </span>
          <span>
            Code: <b>{seller.code}</b> <Copy size={12} />
          </span>
        </div>
        <div className="info-grid">
          <Info label="Seller ID" value={seller.id} />
          <Info label="Seller Type" value={seller.sellerType} />
          <Info label="Company name" value={seller.companyName} />
          <Info label="New Seller Probation Status" value={seller.probationStatus} link />
          <Info label="AM" value="-" />
          <Info label="Create Time" value={seller.createTime} />
          <Info label="Violation Score" value={String(seller.violationScore)} />
          <Info label="Invited Seller Label" value={seller.invitedLabel} />
        </div>
      </div>
      <div className="comments-box">
        <div className="comments-title">
          <MessageSquare size={16} />
          Comments
        </div>
        <textarea placeholder="Leave comments" />
        <button>Send</button>
      </div>
    </section>
  );
}

function Info({ label, value, link }: { label: string; value: string; link?: boolean }) {
  return (
    <div className="info-item">
      <span>{label}</span>
      <strong className={link ? "link-value" : ""}>{value}</strong>
    </div>
  );
}
