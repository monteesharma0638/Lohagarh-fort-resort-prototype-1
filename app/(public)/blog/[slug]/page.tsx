import Blogs from "@/models/Blogs";
import { connectDB } from "@/lib/db";
import edjsHTML from "editorjs-html";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";

const customParsers: Record<string, (block: any) => string> = {
  header: (block: any) => {
    const level = block.data?.level || 2;
    const text = block.data?.text || "";
    const alignment = block.tunes?.alignmentTune?.alignment || "left";
    const alignClass = alignment === "center" ? "text-center" : alignment === "right" ? "text-right" : "";
    return `<h${level} class="${alignClass}">${text}</h${level}>`;
  },
  paragraph: (block: any) => {
    const text = block.data?.text || "";
    const alignment = block.tunes?.alignmentTune?.alignment || "left";
    const alignClass = alignment === "center" ? "text-center" : alignment === "right" ? "text-right" : "";
    return `<p class="${alignClass}">${text}</p>`;
  },
  list: (block: any) => {
    const type = block.data?.style === "ordered" ? "ol" : "ul";
    const items = (block.data?.items || []).map((item: string) => `<li>${item}</li>`).join("");
    return `<${type}>${items}</${type}>`;
  },
  image: (block: any) => {
    const url = block.data?.file?.url || block.data?.url || "";
    const caption = block.data?.caption || "";
    const stretched = block.data?.stretched ? "stretched" : "";
    const withBorder = block.data?.withBorder ? "with-border" : "";
    return `<figure class="editorjs-image ${stretched} ${withBorder}"><img src="${url}" alt="${caption}" />${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`;
  },
  code: (block: any) => {
    const code = block.data?.code || "";
    return `<pre><code>${code}</code></pre>`;
  },
  quote: (block: any) => {
    const text = block.data?.text || "";
    const caption = block.data?.caption || "";
    return `<blockquote><p>${text}</p>${caption ? `<cite>${caption}</cite>` : ""}</blockquote>`;
  },
  delimiter: () => {
    return `<div class="delimiter"></div>`;
  },
  table: (block: any) => {
    const rows = block.data?.content || [];
    const withHeadings = block.data?.withHeadings || false;
    let html = "<table>";
    rows.forEach((row: string[], i: number) => {
      const tag = withHeadings && i === 0 ? "th" : "td";
      html += "<tr>" + row.map((cell: string) => `<${tag}>${cell}</${tag}>`).join("") + "</tr>";
    });
    html += "</table>";
    return html;
  },
  embed: (block: any) => {
    const src = block.data?.embed || "";
    const caption = block.data?.caption || "";
    return `<figure class="editorjs-embed"><iframe src="${src}" frameborder="0" allowfullscreen></iframe>${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`;
  },
  raw: (block: any) => {
    return block.data?.html || "";
  },
  warning: (block: any) => {
    return `<div class="warning-block"><strong>${block.data?.title || ""}</strong><p>${block.data?.message || ""}</p></div>`;
  },
  checklist: (block: any) => {
    const items = (block.data?.items || [])
      .map((item: any) => `<li class="${item.checked ? "checked" : ""}">${item.text}</li>`)
      .join("");
    return `<ul class="checklist">${items}</ul>`;
  },
};

const edjsParser = edjsHTML(customParsers);


export async function generateMetadata({ params }: any) {
  await connectDB();
  const slug = (await params)?.slug;
  const blog = await Blogs.findOne({ slug }).populate("category").lean() as any;

  const metadata = blog.metadata;

  let description = "";
  let keywords = "";
  let openGraph: any = {};

  metadata.forEach((tag: any) => {
    if (tag.property === "name" && tag.key === "description") {
      description = tag.content;
    }

    if (tag.property === "name" && tag.key === "keywords") {
      keywords = tag.content;
    }

    if (tag.property === "property" && tag.key.startsWith("og:")) {
      const ogKey = tag.key.replace("og:", "");
      openGraph[ogKey] = tag.content;
    }
  });

  return {
    title: blog.title,
    description,
    keywords,
    openGraph
  };
}

export default async function BlogPost({ params }: any) {
  await connectDB();
  const slug = (await params)?.slug;
  const blog = await Blogs.findOne({ slug, status: "published" }).populate("category").lean() as any;

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-serif text-foreground mb-4">Blog Not Found</h1>
          <p className="text-foreground/60 mb-8">The article you are looking for does not exist.</p>
          <Link href="/blog" className="text-primary font-bold text-sm tracking-widest uppercase hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  let parsedHTML = "";
  if (blog.blocks) {
    try {
      const parsed = JSON.parse(blog.blocks);
      const blocks = parsed.blocks ? parsed : { blocks: parsed };
      const result = edjsParser.parse(blocks);
      parsedHTML = Array.isArray(result) ? result.join("") : result;
    } catch {
      parsedHTML = `<p>Unable to render content.</p>`;
    }
  }

  const categoryName = blog.category?.name || null;
  const publishedDate = blog.createdAt ? formatDate(blog.createdAt) : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden bg-[#1E0800]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E0800] via-[#1E0800]/60 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 pb-16 max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors text-sm mb-8"
          >
            <ArrowLeft size={16} />
            <span className="tracking-widest uppercase text-xs font-bold">Back to Home</span>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            {categoryName && (
              <span className="inline-flex items-center gap-1.5 bg-primary/20 text-primary px-3 py-1 text-xs font-bold tracking-widest uppercase">
                <Tag size={12} />
                {categoryName}
              </span>
            )}
            {publishedDate && (
              <span className="inline-flex items-center gap-1.5 text-white/50 text-xs tracking-wider">
                <Calendar size={12} />
                {publishedDate}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight hero-text-shadow">
            {blog.title}
          </h1>
        </div>
      </div>

      <article className="container mx-auto px-6 max-w-3xl py-16">
        <div className="editorjs-content" dangerouslySetInnerHTML={{ __html: parsedHTML }} />

        <div className="mt-20 pt-10 border-t border-border">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-bold tracking-widest uppercase"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </article>
    </div>
  );
}
