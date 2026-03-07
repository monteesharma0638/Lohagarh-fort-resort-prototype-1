import { IMetaTag } from "@/interface/IMetadata";
import { useState } from "react";


export default function useAddMetdata() {
  const [metadata, setMetadata] = useState<IMetaTag[]>([]);

  const handleAddMetaRow = () => {
    setMetadata((prev) => [
      ...prev,
      { property: "name", key: "", content: "" },
    ]);
  };

  const updateMetaRow = (
    index: number,
    field: keyof IMetaTag,
    value: string,
  ) => {
    setMetadata((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const removeMetaRow = (index: number) => {
    setMetadata((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    metadata,
    handleAddMetaRow,
    removeMetaRow,
    updateMetaRow,
    setMetadata
  };
}
