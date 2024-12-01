import { EditorProps } from '../types/markdowntpye'

// interface EditorProps {
//     markdown: string;
//     setMarkdown: (value: string) => void;
//   }
export function Editor({markdown,setMarkdown}:EditorProps) {
  return (
    <>
      {/* <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-full rounded-lg border border-gray-200 p-4 font-mono text-sm focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 overflow-y flex-1 px-4 text-[#274c77]  resize-none "
                placeholder="Start writing your markdown..."
              /> */}
      <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className='w-full h-full border rounded-lg flex-1'/>
    </>
  )
}

