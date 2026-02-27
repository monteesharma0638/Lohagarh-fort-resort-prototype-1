import { useEffect, useRef } from 'react'
import { ToolConstructable } from '@editorjs/editorjs';

export default function BlogEditor({editorRef}: {editorRef: any}) {
  const holderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let editor: any;

    if (!holderRef.current) return;

    // ✅ Prevent double initialization
    if (editorRef.current) return;

    const initEditor = async () => {
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const Paragraph = (await import("@editorjs/paragraph")).default;
      const Header = (await import("@editorjs/header")).default;
      const List = (await import("@editorjs/list")).default;
      const ImageTool = (await import("@editorjs/image")).default;
      const Quote = (await import("@editorjs/quote")).default;
      const Embed = (await import("@editorjs/embed" as any)).default;
      const Table = (await import("@editorjs/table")).default;
      const Code = (await import("@editorjs/code")).default;
      const Checklist = (await import("@editorjs/checklist" as any)).default;
      const Marker = (await import("@editorjs/marker" as any)).default;
      const Underline = (await import("@editorjs/underline")).default;
      const AlignmentBlockTool = (await import("editorjs-text-alignment-blocktune" as any)).default;

      editorRef.current = new EditorJS({
        holder: holderRef.current!,
        placeholder: "Write something...",

        tools: {
          header: {
            class: Header as any,
            inlineToolbar: true,
            tunes: ['alignmentTune'],
          },
          paragraph: {
            class: Paragraph as any,
            tunes: ['alignmentTune'],
            config: {
                placeholder: 'Start Typing...',
                preserveBlank: true,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },

          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: "/api/upload-image", // 👈 create this API
              },
            },
            tunes: ['alignmentTune'],
          },

          quote: {
            class: Quote,
            inlineToolbar: true,
          },
          embed: Embed,
          table: Table,
          code: Code,
          checklist: Checklist,
          marker: Marker,
          underline: Underline,
          alignmentTune: {
            class: AlignmentBlockTool,
            config:{
                // default: "right",
                blocks: {
                    header: 'center',
                    list: 'right',
                    Paragraph: "center"
                }
            },
            }
        },
        defaultBlock: "paragraph"
      });
    };

    initEditor();

    return () => {
      holderRef.current?.remove();
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div
        ref={holderRef}
        style={{
            minHeight: "300px",
            border: "1px solid #ccc",
            padding: "10px",
        }}
    />
  )
}
