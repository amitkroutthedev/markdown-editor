/* eslint-disable @typescript-eslint/no-unused-vars */

import { Eye, FileEdit } from "lucide-react";
import markdownit from "markdown-it";
import { useState } from "react";
import { MdHtml } from "react-icons/md";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";


interface PreviewProps {
  markdown: string;
  isPreview: boolean;
  togglePreview: () => void;
}

/*const HighlightedText = ({ children }: { children: React.ReactNode }) => (
  <mark className="bg-yellow-200 text-gray-900 px-1 rounded">{children}</mark>
);*/

export function Preview({ markdown,isPreview,togglePreview }: PreviewProps) {
  const [hbtnClick, setHbtnClick] = useState(false);
  const [content, setContent] = useState(markdown);
  const md = markdownit();
  function toggleHTMLContentHandler() {
    if (hbtnClick) {
      setContent(markdown); 
    } else {
      const result = md.render(markdown);
      setContent(result);
    }
    setHbtnClick(!hbtnClick);
  }

  return (
    <div className="h-full overflow-auto max-w-none bg-white">
      <div className="flex items-end justify-end px-5 py-1 w-full">
      <button
          onClick={togglePreview}
          className="max-sm:flex hidden items-center gap-2 px-3 py-1.5 rounded text-sm"
        >
          {isPreview ? <FileEdit size={18} /> : <Eye size={18} />}
        </button>
        <button onClick={toggleHTMLContentHandler} className={`text-slate-500 px-5 rounded-xl ${hbtnClick ? "border border-slate-400" : ""}`}>
          <MdHtml size={30}  />
        </button>
      </div>
      <div className="prose prose-invert px-8">
        {hbtnClick ? (
          <pre>
            <code className="text-black">{content}</code></pre>
        ) : (
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-3xl font-bold mb-4 text-[#212529]" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-2xl font-bold mb-3 text-[#212529]" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-xl font-bold mb-2 text-[#212529] " {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="mb-4 text-[#212529] " {...props} />
              ),
              a: ({ node, ...props }) => (
                <a className="text-blue-700 underline hover:text-blue-900" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc list-inside mb-4 text-[#212529] " {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal list-inside mb-4 text-[#212529] " {...props} />
              ),
              code: ({ node, ...props }) => (
                  <code
                    className="block bg-gray-200 p-4 rounded-lg mb-4 text-[#212529] "
                    {...props}
                  />
                ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-gray-950 pl-4 italic my-4 text-[#212529] "
                  {...props}
                />
              ),
              del: ({ node, ...props }) => (
                <del className="text-gray-600 line-through" {...props} />
              ),
            }}
          >
            {markdown}
          </Markdown>
        )}
      </div>
    </div>
  );
}
