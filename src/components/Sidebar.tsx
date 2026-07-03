import { Home, Layers, PanelLeft, Search, Zap } from "lucide-react";

const navItems = [
  { label: "Home", icon: Home },
  { label: "GNE", icon: Layers, active: true },
  { label: "Thunder", icon: Zap },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-tools">
        <PanelLeft size={16} />
        <Search size={16} />
        <div className="tool-active">▣</div>
      </div>
      <div className="bookmark">☆ Bookmarks (0)</div>
      <nav className="side-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button className={item.active ? "side-item active" : "side-item"} key={item.label}>
              <Icon size={15} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="show-menus">
        <span>Show all menus</span>
        <span className="toggle" />
      </div>
    </aside>
  );
}
