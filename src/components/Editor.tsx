import {
  Copy,
  Download,
  FileEdit,
  Eye,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  LinkIcon,
  ListOrdered,
  ListIcon,
  Code2,
  LucideTextQuote,
  Strikethrough,
} from "lucide-react";



interface EditorProps {
  markdown: string;
  setMarkdown: (value: string) => void;
  isPreview: boolean;
  togglePreview: () => void;
}

export function Editor({
  markdown,
  setMarkdown,
  isPreview,
  togglePreview,
}: EditorProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  function whichcodehandler(codetext: string): string {
    switch (codetext) {
      case "h1":
        return "# ";
      case "h2":
        return "## ";
      case "h3":
        return "### ";
      case "h4":
        return "#### ";
      case "h5":
        return "##### ";
      case "h6":
        return "###### ";
      case "link":
        return ` [Duck Duck Go](https://duckduckgo.com) `;
      case "ulist":
        return `\n - Item1 \n - Item2 \n - Item3`;
      case "olist":
        return `\n 1. Item1 \n 2. Item2 \n 3. Item3`;
      case "textblock":
        return `> `;
      case "strikethrough":
        return `~~`;
      case "code":
        return "```";
      default:
        return "";
    }
  }

  function addCode(codetext: string) {
    const selectedText = whichcodehandler(codetext);
    const inputEl = document.getElementById("texteditorId") as HTMLInputElement;
    if (!inputEl) return;
    // Put the tags at current cursor position
    const pos = inputEl.selectionStart??0;
    const val = inputEl.value;
    const start = val.substring(0, pos);
    const end = val.substring(pos, val.length);
    inputEl.value = start + selectedText + end;
    setMarkdown(inputEl.value);
  }
  function subAddCode(codetext: string) {
    console.log(codetext);
    const inputEl = document.getElementById("texteditorId") as HTMLInputElement;
    if (!inputEl) return;

    const start = inputEl.selectionStart ?? 0;
    const end = inputEl.selectionEnd ?? 0;
    const text = whichcodehandler(codetext);
    const before = inputEl.value.substring(0, start);
    const after = inputEl.value.substring(end, inputEl.value.length);
    // Get the selected text
    const sel = inputEl.value.substring(start, end);
    let selectedText;
    if(codetext==="code"){
      selectedText = sel ? `\n${sel}\n` : "\n\n";
      inputEl.selectionStart = inputEl.selectionEnd = start + text.length + selectedText.length;
    }
    if(codetext==="strikethrough"){
      selectedText = sel
      inputEl.selectionStart = inputEl.selectionEnd = start + text.length + selectedText.length;
    }
    //const selectedText = sel ? `\n${sel}\n` : "\n\n";

    // Insert the new text at the cursor position
    inputEl.value = before + text + selectedText + text + after;
    // Set the cursor position to after the newly inserted text


    setMarkdown(inputEl.value);
  }

  return (
    <div className="h-full flex flex-col  border-2 border-black rounded-xl">
      <div className="flex flex-wrap items-center h-fit p-1 bg-[#3a506b] text-[#a3cef1] rounded-t-lg">
        <div className="flex flex-wrap items-center gap-3 px-1">
          <button onClick={() => addCode("h1")}>
            <Heading1 />
          </button>
          <button onClick={() => addCode("h2")}>
            <Heading2 />
          </button>
          <button onClick={() => addCode("h3")}>
            <Heading3 />
          </button>
          <button onClick={() => addCode("h4")}>
            <Heading4 />
          </button>
          <button onClick={() => addCode("h5")}>
            <Heading5 />
          </button>
          <button onClick={() => addCode("h6")}>
            <Heading6 />
          </button>
          <button onClick={() => addCode("link")}>
            <LinkIcon />
          </button>
          <button onClick={() => addCode("ulist")}>
            <ListIcon />
          </button>
          <button onClick={() => addCode("olist")}>
            <ListOrdered />
          </button>
          <button onClick={() => addCode("textblock")}>
            <LucideTextQuote />
          </button>
          <button onClick={() => subAddCode("code")}>
            <Code2 />
          </button>
          <button onClick={() => subAddCode("strikethrough")}>
            <Strikethrough />
          </button>
        </div>
      </div>
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        className="overflow-y-auto flex-1 w-full p-4 text-[#274c77] font-mono resize-none focus:outline-none"
        placeholder="Write your markdown here..."
        autoFocus
        id="texteditorId"
      /> 
      
      <div className="h-10 flex items-center gap-2 py-2 justify-end bg-white rounded-b-xl border-t-2 border-black">
        <button
          onClick={togglePreview}
          className="max-sm:flex hidden items-center gap-2 px-3 py-1.5 rounded hover:bg-gray-700 transition-colors"
        >
          {isPreview ? <FileEdit size={18} /> : <Eye size={18} />}
          {isPreview ? "Edit" : "Preview"}
        </button>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gray-700 transition-colors"
          title="Copy to clipboard"
        >
          <Copy size={18} /> Copy
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gray-700 transition-colors"
          title="Download markdown"
        >
          <Download size={18} /> Download
        </button>
      </div>
    </div>
  );
}
