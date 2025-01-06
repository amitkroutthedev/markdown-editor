/* eslint-disable @typescript-eslint/no-unused-vars */

import markdownit from "markdown-it";
import { useState } from "react";
import { MdHtml } from "react-icons/md";
import ReactMarkdown from "react-markdown";
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

export function Preview({ markdown }: PreviewProps) {
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
    <div className="h-[30em] overflow-none max-w-none bg-white">    
      <div className="flex justify-between items-center mb-2">
      <h2 className="text-lg font-semibold">Preview</h2>
      <button onClick={toggleHTMLContentHandler} className={`text-slate-700 px-5 rounded-xl ${hbtnClick ? "border border-slate-400" : ""}`}>
          <MdHtml size={30}  />
        </button>
      </div>
      <div className="prose prose-invert max-w-none overflow-y-auto">
        {hbtnClick ? (
          <pre>
            <code className="text-black">{content}</code></pre>
        ) : (
          <ReactMarkdown
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
              // code: ({ node, ...props }) => (
              //     <code
              //       className="block bg-gray-200 p-4 rounded-lg mb-4 text-[#212529] "
              //       {...props}
              //     />
              //   ),
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
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
