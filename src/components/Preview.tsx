/* eslint-disable @typescript-eslint/no-unused-vars */
//import ReactMarkdown from "react-markdown";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
//import markdownit from "markdown-it";

interface PreviewProps {
  markdown: string;
}

/*const HighlightedText = ({ children }: { children: React.ReactNode }) => (
  <mark className="bg-yellow-200 text-gray-900 px-1 rounded">{children}</mark>
);*/

export function Preview({ markdown }: PreviewProps) {
 // const md = markdownit();
  //const result = md.render(markdown);
  //console.log(result);

  return (
    <div className="h-full border-2 border-gray-400 prose prose-invert max-w-none p-8 overflow-auto bg-gray-900 rounded-lg">
       <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mb-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold mb-3" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-bold mb-2" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-4 text-gray-300" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-blue-400 hover:text-blue-300" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside mb-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside mb-4" {...props} />
          ),
          code: ({ node, inline, ...props }) =>
            inline ? (
              <code className="bg-gray-800 px-1 rounded" {...props} />
            ) : (
              <code
                className="block bg-gray-800 p-4 rounded-lg mb-4"
                {...props}
              />
            ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-gray-700 pl-4 italic my-4"
              {...props}
            />
          ),
          del: ({ node, ...props }) => (
            <del className="text-gray-500 line-through" {...props} />
          ),
          mark: ({ node, ...props }) => (
            <mark
              className="bg-yellow-200 text-gray-900 px-1 rounded"
              {...props}
            />
          ),
        }}
      >
        {markdown}
      </Markdown> 
      {/*<div dangerouslySetInnerHTML={{ __html: result }} />*/}
    </div>
  );
}
