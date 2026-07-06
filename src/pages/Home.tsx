import { useMemo, useState } from "react";
import { AuditAndHistory } from "@/components/AuditAndHistory";
import { BatchQuery } from "@/components/BatchQuery";
import { DetailDrawer } from "@/components/DetailDrawer";
import { DiagnosticSummary } from "@/components/DiagnosticSummary";
import { SellerActions } from "@/components/SellerActions";
import { SellerSummary } from "@/components/SellerSummary";
import { Sidebar } from "@/components/Sidebar";
import { Timeline } from "@/components/Timeline";
import { TopBar } from "@/components/TopBar";
import {
  auditNodes,
  batchResults,
  details,
  diagnostic,
  historyItems,
  requirementModules,
  seller,
  sellerActions,
  timelineNodes,
} from "@/data/mockData";

export default function Home() {
  const [selectedNodeId, setSelectedNodeId] = useState("vendor");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const selectedDetail = useMemo(() => details[selectedNodeId], [selectedNodeId]);

  function handleSelectNode(id: string) {
    setSelectedNodeId(id);
    setDrawerOpen(true);
  }

  return (
    <div className="app-shell">
      <TopBar />
      <div className="workspace">
        <Sidebar />
        <main className="main-content">
          <div className="page-head">
            <div>
              <p className="breadcrumb">GNE / Seller onboarding analysis</p>
              <h1>Seller onboarding analysis</h1>
            </div>
            <a className="dashboard-link" href="#audit">Seller onboarding dashboard ↗</a>
          </div>

          <section className="search-card">
            <label htmlFor="seller-search">Search for a seller</label>
            <div className="search-row">
              <input id="seller-search" value={seller.id} readOnly />
              <button>Search</button>
            </div>
            <p>
              Recent search: ShopCrazee (7494637214381212924) · VAULTED TCG (7494657534162273561) ·
              Sovereign Commerce (7495790816548981510)
            </p>
          </section>

          <SellerSummary seller={seller} />
          <DiagnosticSummary
            seller={seller}
            diagnostic={diagnostic}
            onOpenBlockedDetail={() => handleSelectNode("pipo")}
          />
          <SellerActions actions={sellerActions} onOpenDetail={handleSelectNode} />
          <section className="panel module-map-panel">
            <div className="panel-title-row">
              <div>
                <p className="eyebrow">Latest PRD mapping</p>
                <h3>8 个核心需求模块</h3>
              </div>
              <span className="safe-mock-badge">Static safe mock</span>
            </div>
            <div className="module-grid">
              {requirementModules.map((module) => (
                <article className="module-card" key={module.id}>
                  <strong>{module.title}</strong>
                  <span>{module.demoSurface}</span>
                  <p>{module.acceptance}</p>
                </article>
              ))}
            </div>
          </section>
          <Timeline nodes={timelineNodes} selectedId={selectedNodeId} onSelect={handleSelectNode} />
          <AuditAndHistory auditNodes={auditNodes} historyItems={historyItems} />
          <BatchQuery results={batchResults} />
        </main>
      </div>
      <DetailDrawer detail={selectedDetail} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
