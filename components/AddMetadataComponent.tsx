import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IMetaTag } from "@/interface/IMetadata";

export default function AddMetadataComponent({metadata,
  handleAddMetaRow,
  updateMetaRow,
  removeMetaRow
}:{
    metadata: IMetaTag[];
    handleAddMetaRow: any;
    updateMetaRow: any;
    removeMetaRow: any
  }) {
  return (
    <div className="space-y-4 bg-muted/30 p-4 rounded-lg border border-border">
      <h4 className="text-sm font-semibold">SEO Meta Tags</h4>

      {metadata.map((row, index) => (
        <div key={index} className="grid grid-cols-3 gap-3 items-center">
          <select
            value={row.property}
            onChange={(e) => updateMetaRow(index, "property", e.target.value)}
            className="h-10 rounded-md border px-3 text-sm"
          >
            <option value="name">name</option>
            <option value="property">property</option>
            <option value="http-equiv">http-equiv</option>
          </select>

          <Input
            placeholder="description / og:title"
            value={row.key}
            onChange={(e) => updateMetaRow(index, "key", e.target.value)}
          />

          <div className="flex gap-2">
            <Input
              placeholder="content"
              value={row.content}
              onChange={(e) => updateMetaRow(index, "content", e.target.value)}
            />

            <Button variant="destructive" onClick={() => removeMetaRow(index)}>
              Remove
            </Button>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={handleAddMetaRow}>
        Add Meta Tag
      </Button>
    </div>
  )
}
