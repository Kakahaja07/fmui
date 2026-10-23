import type { PropDoc } from "@/types/component";

export function PropsTable({ props }: { props: PropDoc[] }) {
  return (
    <div className="overflow-x-auto rounded-[12px] border border-border bg-background">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead className="bg-surface text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <tr>
            <th scope="col" className="px-4 py-2.5 font-medium">Prop</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Type</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Default</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name} className="border-t border-border align-top">
              <td className="px-4 py-3 font-mono text-[12.5px] font-medium text-heading">{p.name}</td>
              <td className="px-4 py-3 font-mono text-[12px] text-muted-foreground">{p.type}</td>
              <td className="px-4 py-3 font-mono text-[12px] text-muted-foreground">{p.default ?? "-"}</td>
              <td className="px-4 py-3 text-muted-foreground">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
