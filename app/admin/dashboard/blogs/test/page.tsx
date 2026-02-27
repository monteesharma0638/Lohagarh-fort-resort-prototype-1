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
    "time": 1772193862240,
    "blocks": [
        {
            "id": "nlfI-BF3px",
            "type": "header",
            "data": {
                "text": "Hello Sunio",
                "level": 2
            },
            "tunes": {
                "alignmentTune": {
                    "alignment": "center"
                }
            }
        },
        {
            "id": "cBUqjeOSIP",
            "type": "paragraph",
            "data": {
                "text": "hello JIAN"
            },
            "tunes": {
                "alignmentTune": {
                    "alignment": "left"
                }
            }
        },
        {
            "id": "pKMJDregjw",
            "type": "paragraph",
            "data": {
                "text": "Hello Nobita"
            },
            "tunes": {
                "alignmentTune": {
                    "alignment": "left"
                }
            }
        },
        {
            "id": "Sijd1AWMgN",
            "type": "image",
            "data": {
                "caption": "",
                "withBorder": false,
                "withBackground": false,
                "stretched": false,
                "file": {
                    "url": "/uploads/1772193850564-Screenshot 2026-02-03 215838.png"
                }
            },
            "tunes": {
                "alignmentTune": {
                    "alignment": "left"
                }
            }
        },
        {
            "id": "ajAkYIJbZs",
            "type": "header",
            "data": {
                "text": "hello Doraemon",
                "level": 2
            },
            "tunes": {
                "alignmentTune": {
                    "alignment": "center"
                }
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
