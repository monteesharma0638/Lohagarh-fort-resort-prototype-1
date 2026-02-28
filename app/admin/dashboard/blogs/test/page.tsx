"use client";
import React, { useEffect, useRef } from 'react';
import edjsHTML from "editorjs-html";

const customParsers = {
  header: (block: any) => {
    // Example: Handling text alignment plugin
    const alignment = block.tunes.alignmentTune.alignment || 'left';
    return `<h${block.data.level} class="text-${alignment} h${block.data.level}">${block.data.text}</h${block.data.level}>`;
  },
  list: (block: any) => {
    const type = block.data.style === 'ordered' ? 'ol' : 'ul';
    const items = block.data.items.map((item: any) => `<li>${item}</li>`).join('');
    return `<${type} class="custom-list-style">${items}</${type}>`;
  }
};

const edjsParser = edjsHTML(customParsers);

export default function page() {
    const doc = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
    const html = edjsParser.parse({
            "time": 1772254832730,
            "blocks": [
                {
                    "id": "d1UgG9xjmB",
                    "type": "code",
                    "data": {
                        "code": "<h1>Hello world</h1>"
                    }
                },
                {
                    "id": "y0KOqiCdIQ",
                    "type": "code",
                    "data": {
                        "code": "<p>some paragraph</p>"
                    }
                }
            ],
            "version": "2.31.3"
        })

        if(doc.current) {
            doc.current.innerHTML = html;
        }
    }, [])

  return (
    <div ref={doc} />
  )
}
