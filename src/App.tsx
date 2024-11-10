import { Github } from "lucide-react";
import { useState } from "react";
import "./App.css";
import { Editor } from "./components/Editor";
import { Preview } from "./components/Preview";

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

  return (
    <div className="h-screen text-[#274c77]" style={{
    }}>
      <header className="h-12 flex items-center px-4 justify-between bg-[#3D405B] text-[#F4F1DE]">
        <p className="text-xl">Markdown Editor</p>
        <a className="mx-10 w-fit" href="https://github.com/amitkroutthedev/markdown-editor"><Github/></a>
      </header>
      <div className="mx-auto h-[calc(100vh-3rem)]">
      <div className="shadow-xl overflow-hidden h-full flex items-center space-x-2">
      {<div className="max-sm:w-full w-1/2 h-full border-r-2">
            {isPreview ? (
              <Preview markdown={markdown} isPreview={isPreview} togglePreview={() => setIsPreview(!isPreview)} />
            ) : (
              <Editor
                markdown={markdown}
                setMarkdown={setMarkdown}
                isPreview={isPreview}
                togglePreview={() => setIsPreview(!isPreview)}
              />
            )}
          </div>}
        <div className="max-sm:hidden h-full w-1/2 overflow-auto">
            <Preview markdown={markdown} isPreview={isPreview} togglePreview={() => setIsPreview(!isPreview)} />
          </div>
        </div>
        {/* <div className="shadow-xl overflow-hidden h-full flex items-center space-x-2">
          <div className="max-sm:w-full w-1/2 h-full">
            {isPreview ? (
              <Preview markdown={markdown} />
            ) : (
              <Editor
                markdown={markdown}
                setMarkdown={setMarkdown}
                isPreview={isPreview}
                togglePreview={() => setIsPreview(!isPreview)}
              />
            )}
          </div>
          <div className="max-sm:hidden h-full w-1/2 overflow-auto">
            <Preview markdown={markdown} />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
