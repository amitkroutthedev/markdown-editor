import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import "./App.css";
import { Editor } from "./components/Editor";
import { Preview } from "./components/Preview";
import { Card, CardContent, CardFooter } from "./ui/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select";
import { Toolbar } from "./components/Toolbar";
import { allTemplates } from "./lib/selectmarkdown";

const initialMarkdown = `# Welcome to the Markdown Editor

## Features

- Live preview
- GitHub Flavored Markdown support
- Syntax highlighting
- ~~Strikethrough text~~
- Copy to clipboard
- Download as .md file


## Code Example
\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> Try editing this markdown to see the live preview!
`;

function App() {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [isPreview, setIsPreview] = useState(false);
  const [contentType, setContentType] = useState('standard')
  
  useEffect(()=>{
    console.log(contentType)
    setMarkdown(allTemplates[contentType])
  },[contentType])

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Card className="mx-auto max-w-6xl">
      <CardContent className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold">Markdown Editor</h1>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="standard">Standard Content</SelectItem>
                <SelectItem value="portfolio">Portfolio</SelectItem>
                <SelectItem value="product">Product/API/Software</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Toolbar markdown={markdown}
                setMarkdown={setMarkdown}/>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-4 h-full overflow-y-auto">
              <h2 className="mb-2 text-lg font-semibold">Edit</h2>
              <Editor markdown={markdown}
                setMarkdown={setMarkdown}/>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 overflow-y-scroll">
                <Preview markdown={markdown} isPreview={isPreview} togglePreview={() => setIsPreview(!isPreview)}/>
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t bg-gray-50 p-4">
          <p className="text-sm text-gray-600">
            Created by <span className="font-semibold">Amit Kumar Rout</span>
          </p>
          <a
            href="https://github.com/amitkroutthedev/markdown-editor"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <Github className="mr-1 h-4 w-4" />
            View on GitHub
          </a>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App;
