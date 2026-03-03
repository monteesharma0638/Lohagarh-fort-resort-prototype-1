import Blogs from '@/models/Blogs';
import edjsHTML from "editorjs-html";

const edjsParser = edjsHTML();

export default async function page({params}: any) {
  const slug = (await params)?.slug;
  const blog = await Blogs.findOne({slug}).lean();
  let parsedHTML;
  if(blog.blocks) {
    parsedHTML = edjsParser.parse(JSON.parse(blog.blocks));
  }
  else {
    parsedHTML = `<div class="min-h-[100vh]">No content available</div>`
  }

  return (
    <div>
        <h1 className='min-h-[60vh]'>{blog.title}</h1>
        <div dangerouslySetInnerHTML={{__html: parsedHTML}} />
    </div>
  )
}
