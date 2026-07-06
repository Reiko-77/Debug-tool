import { Copy, Download, FileImage, RefreshCcw } from "lucide-react";
import { useState } from "react";
import type { EvidenceFile } from "@/types";

interface EvidenceGridProps {
  files: EvidenceFile[];
}

export function EvidenceGrid({ files }: EvidenceGridProps) {
  const [previewId, setPreviewId] = useState<string | null>(null);

  if (!files.length) {
    return <div className="empty-state">该节点暂无提交资料。</div>;
  }

  const previewFile = files.find((file) => file.id === previewId);

  return (
    <>
      <div className="evidence-grid">
        {files.map((file) => (
          <article className={`evidence-card ${file.status}`} key={file.id}>
            <button className="evidence-preview" onClick={() => setPreviewId(file.id)}>
              <FileImage size={26} />
              <span>{file.status === "available" ? "Open preview" : "Preview failed"}</span>
            </button>
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
                <button title="Retry preview" onClick={() => setPreviewId(file.id)}>
                  <RefreshCcw size={13} />
                </button>
              ) : (
                <button title="Download mock file">
                  <Download size={13} />
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
      {previewFile && (
        <div className={`preview-panel ${previewFile.status}`}>
          <strong>{previewFile.name}</strong>
          <p>{previewFile.previewText}</p>
          {previewFile.failureReason && <p>失败原因：{previewFile.failureReason}</p>}
          {previewFile.fallback && <p>替代方式：{previewFile.fallback}</p>}
        </div>
      )}
    </>
  );
}
