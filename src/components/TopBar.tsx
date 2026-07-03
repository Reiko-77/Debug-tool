import { Bell, BookOpen, Search, Sparkles } from "lucide-react";

export function TopBar() {
  return (
    <header className="top-bar">
      <div className="brand">
        <div className="brand-mark">◒</div>
        <span>Pearl</span>
      </div>
      <div className="site-select">Default Site ▾</div>
      <div className="platform-chip">Pearl - For Governance Operation ×</div>
      <div className="global-search">
        <Search size={14} />
        <span>Search Seller, Creator, Video, Live, Product...</span>
      </div>
      <div className="top-actions">
        <span className="assistant-entry">
          <Sparkles size={14} />
          Tiko Assistant
        </span>
        <span>United States(BDEE) ▾</span>
        <Bell size={15} />
        <span>To Do</span>
        <BookOpen size={15} />
        <div className="avatar">M</div>
      </div>
    </header>
  );
}
