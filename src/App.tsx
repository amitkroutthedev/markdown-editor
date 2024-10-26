import { useState } from "react";
import { Editor } from "./components/Editor";
import { Preview } from "./components/Preview";
import "./App.css";
import { Github } from "lucide-react";

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
      backgroundImage: `
        linear-gradient(#e5e5e5 1px, transparent 1px),
        linear-gradient(90deg, #e5e5e5 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px'
    }}>
      <header className="h-20 flex items-center px-4 justify-between">
        <p className="text-3xl bg-white">Markdown Editor</p>
        <a className="mx-10 bg-white w-fit"><Github/></a>
      </header>
      <div className="mx-auto p-4 h-[calc(100vh-5rem)]">
        <div className="shadow-xl overflow-hidden h-full flex items-center space-x-2">
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
        </div>
      </div>
    </div>
  );
}

export default App;
