import { Bold, Clipboard, Code, CodeSquareIcon, Download, Heading1, Heading2, Heading3, Image, Link, List, ListOrdered, LucideTextQuote, Strikethrough } from 'lucide-react'
import { EditorProps } from '../types/markdowntpye'
import { Button } from '../ui/Button'

export function Toolbar({markdown,setMarkdown}:EditorProps) {
    const toolbarButtons = [
      //single
        { icon: <Heading1 className="h-4 w-4" />, action: '# ', label: 'Heading 1' },
        { icon: <Heading2 className="h-4 w-4" />, action: '## ', label: 'Heading 2' },
        { icon: <Heading3 className="h-4 w-4" />, action: '### ', label: 'Heading 3' },
        { icon: <LucideTextQuote className="h-4 w-4" />, action: '>', label: 'Textblock' },
        { icon: <Link className="h-4 w-4" />, action: '[link](https://markdown-editor-eight-xi.vercel.app/)', label: 'Textblock' },
        { icon: <Image className="h-4 w-4" />, action: '![Alt text](https://placehold.co/600x400 "a title")', label: 'Image' },
        { icon: <List className="h-4 w-4" />, action: `\n - Item1 \n - Item2 \n - Item3`, label: 'Bullet List' },
        { icon: <ListOrdered className="h-4 w-4" />, action: '\n 1. Item1 \n 2. Item2 \n 3. Item3', label: 'Numbered List' },
        //double
        { icon: <Strikethrough className="h-4 w-4" />, action: '~', label: 'Strikethrough' },
        { icon: <Bold className="h-4 w-4" />, action: '**', label: 'Bold' },
        { icon: <Code className="h-4 w-4" />, action: '`', label: 'Code' },
        { icon: <CodeSquareIcon className="h-4 w-4" />, action: '``` \n', label: 'Codeblock' },
      ]
      const insertText = (action: string) => {
        const textarea = document.querySelector('textarea')
        if (!textarea) return
    
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const text = textarea.value
    
        const before = text.substring(0, start)
        const selected = text.substring(start, end)
        const after = text.substring(end)

        setMarkdown(`${before}${action}${selected}${after}`)

        if(action==="~"||"**"||"`"||"```\n"){
          setMarkdown(`${before}${action}${selected}${action}${after}`)
        }

        // if(action === "#"||"##"||"###"||">"){
        //   console.log('Here');
          
        //   setMarkdown(`${before}${action}${selected}${after}`)
        // }
        // else if(action === "~"||"**"){
        //   setMarkdown(`${before}${action}${selected}${action}${after}`)
        // }
      }
      const copyToClipboard = () => {
        navigator.clipboard.writeText(markdown)
      }
    
      const downloadMarkdown = () => {
        const blob = new Blob([markdown], { type: 'text/markdown' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'markdown-content.md'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
  return (
    <div className="mb-4 flex flex-wrap gap-2 rounded-lg bg-gray-100 p-2">
            {toolbarButtons.map((button, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => insertText(button.action)}
                title={button.label}
              >
                {button.icon}
              </Button>
            ))}
            <div className="ml-auto flex gap-2">
              <Button variant="ghost" size="sm" title="Copy to Clipboard" onClick={copyToClipboard}>
                <Clipboard className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" title="Download .md" onClick={downloadMarkdown}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
  )
}

