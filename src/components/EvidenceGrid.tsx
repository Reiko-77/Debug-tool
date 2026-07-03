import { Copy, Download, FileImage, RefreshCcw } from "lucide-react";
import type { EvidenceFile } from "@/types";

interface EvidenceGridProps {
  files: EvidenceFile[];
}

export function EvidenceGrid({ files }: EvidenceGridProps) {
  if (!files.length) {
    return <div className="empty-state">该节点暂无提交资料。</div>;
  }

  return (
    <div className="evidence-grid">
      {files.map((file) => (
        <article className={`evidence-card ${file.status}`} key={file.id}>
          <div className="evidence-preview">
            <FileImage size={26} />
            <span>{file.status === "expired" ? "URL expired" : "Preview"}</span>
          </div>
          <div className="evidence-body">
            <strong>{file.name}</strong>
            <span>{file.type}</span>
            <code>{file.id}</code>
          </div>
          <div className="evidence-actions">
            <button title="Copy file ID">
              <Copy size={13} />
            </button>
            {file.status === "expired" ? (
              <button title="Retry">
                <RefreshCcw size={13} />
              </button>
            ) : (
              <button title="Download">
                <Download size={13} />
              </button>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
