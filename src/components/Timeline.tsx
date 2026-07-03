import { Clock3 } from "lucide-react";
import type { TimelineNode } from "@/types";
import { reviewStatusLabel, statusClass } from "./status";

interface TimelineProps {
  nodes: TimelineNode[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function Timeline({ nodes, selectedId, onSelect }: TimelineProps) {
  return (
    <section className="panel timeline-panel">
      <div className="panel-title-row">
        <div>
          <p className="eyebrow">Onboarding process</p>
          <h3>可解释时间线</h3>
        </div>
        <div className="view-switch">
          <button className="active">业务流程</button>
          <button>时间顺序</button>
        </div>
      </div>
      <div className="timeline">
        {nodes.map((node, index) => (
          <button
            className={[
              "timeline-node",
              node.status,
              selectedId === node.id ? "selected" : "",
              node.isCurrentBlocker ? "blocker" : "",
            ].join(" ")}
            key={node.id}
            onClick={() => onSelect(node.id)}
          >
            <span className="node-index">{index + 1}</span>
            <span className="node-line" />
            <div className="node-card">
              <div className="node-card-head">
                <strong>{node.name}</strong>
                <span className={statusClass(node.status)}>{reviewStatusLabel(node.status)}</span>
              </div>
              <p>{node.description}</p>
              <div className="node-meta">
                <span>
                  <Clock3 size={12} />
                  {node.startTime}
                </span>
                <span>{node.owner}</span>
              </div>
              {node.isCurrentBlocker && <div className="blocker-label">当前阻塞点</div>}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
