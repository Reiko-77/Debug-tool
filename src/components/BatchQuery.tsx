import { Download, Play } from "lucide-react";
import { useState } from "react";
import type { BatchResult } from "@/types";

interface BatchQueryProps {
  results: BatchResult[];
}

export function BatchQuery({ results }: BatchQueryProps) {
  const [query, setQuery] = useState("7495790816548981510\n7494637214381212924\n7494657534162273561");
  const [hasRun, setHasRun] = useState(true);
  const [exported, setExported] = useState(false);
  const sellerIds = query
    .split(/[\n, ]+/)
    .map((id) => id.trim())
    .filter(Boolean);
  const visibleResults = results.filter((row) => sellerIds.includes(row.sellerId));

  return (
    <section className="panel batch-panel">
      <div className="panel-title-row">
        <div>
          <p className="eyebrow">Batch Query</p>
          <h3>批量查询和导出</h3>
        </div>
        <button className="export-btn" onClick={() => setExported(true)}>
          <Download size={14} />
          Export CSV
        </button>
      </div>
      <div className="batch-input-row">
        <textarea value={query} onChange={(event) => setQuery(event.target.value)} />
        <button className="run-btn" onClick={() => setHasRun(true)}>
          <Play size={15} />
          Run
        </button>
      </div>
      {hasRun && (
        <>
          <div className="batch-summary">
            Parsed {sellerIds.length} seller IDs · Matched {visibleResults.length} mock records
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Seller ID</th>
                  <th>Status</th>
                  <th>Blocked Stage</th>
                  <th>Reason</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {visibleResults.map((row) => (
                  <tr key={row.sellerId}>
                    <td>{row.sellerId}</td>
                    <td>
                      <span className={`seller-status ${row.status.toLowerCase().replace(" ", "-")}`}>
                        {row.status}
                      </span>
                    </td>
                    <td>{row.blockedStage}</td>
                    <td>{row.reason}</td>
                    <td>{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {exported && (
        <div className="export-preview">
          Export preview ready: case_tracking_batch_mock.csv · {visibleResults.length} rows · static demo only.
        </div>
      )}
    </section>
  );
}
