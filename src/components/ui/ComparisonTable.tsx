interface ComparisonTableProps {
  title: string;
  headers: string[];
  rows: string[][];
}

export default function ComparisonTable({ title, headers, rows }: ComparisonTableProps) {
  return (
    <div className="mb-2.5">
      <div className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">
        {title}
      </div>
      <div className="bg-white rounded-xl border border-brand-border overflow-hidden">
        <table className="cmp-table">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  style={{
                    background: i === 0 ? "#FFF8ED" : i === 1 ? "#E8F5E9" : "#F0F0F0",
                    color: i === 0 ? "#6B4C00" : i === 1 ? "#1B5E20" : "#444",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    style={{
                      background: ci === 0 ? "#FFFDF8" : ci === 1 ? "#F9FFF9" : "#fff",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
