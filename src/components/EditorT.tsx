import {
  Code2,
  Copy,
  Download,
  Eye,
  FileEdit,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  LinkIcon,
  ListIcon,
  ListOrdered,
  LucideTextQuote,
  Strikethrough,
} from "lucide-react";

import TooltipButton from "../ui/ToolTipButton";




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
    const textarea = document.getElementById("texteditorId") as HTMLTextAreaElement;
    textarea?.select();
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
    const pos = inputEl.selectionStart ?? 0;
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
    if (codetext === "code") {
      selectedText = sel ? `\n${sel}\n` : "\n\n";
      inputEl.selectionStart = inputEl.selectionEnd = start + text.length + selectedText.length;
    }
    if (codetext === "strikethrough") {
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
    <div className="h-full flex flex-col bg-white">
      <div className="flex justify-between flex-col items-center h-fit text-[#3a506b] border-[#3a506b] border-2 rounded-b-xl  ">
        <div className="flex flex-wrap items-center justify-start w-full gap-3 p-1">
          <TooltipButton button={
            <p onClick={() => addCode("h1")}>
              <Heading1 size={20} />
            </p>
          } content="heading1" />
          <TooltipButton button={
            <p onClick={() => addCode("h2")}>
              <Heading2 size={20} />
            </p>} content="heading 2" />
          <TooltipButton button={
            <p onClick={() => addCode("h3")}>
              <Heading3 size={20} />
            </p>} content="heading3" />
          <TooltipButton button={
            <p onClick={() => addCode("h4")}>
              <Heading4 size={20} />
            </p>} content="heading4" />
          <TooltipButton button={
            <p onClick={() => addCode("h5")}>
              <Heading5 size={20} />
            </p>} content="heading5" />
          <TooltipButton button={
            <p onClick={() => addCode("h6")}>
              <Heading6 size={20} />
            </p>} content="heading6" />
          <TooltipButton button={
            <p onClick={() => addCode("link")}>
              <LinkIcon size={20} />
            </p>} content="link" />
          <TooltipButton button={
            <p onClick={() => addCode("ulist")}>
              <ListIcon size={20} />
            </p>} content="ul" />
          <TooltipButton button={
            <p onClick={() => addCode("olist")}>
              <ListOrdered size={20} />
            </p>} content="ol" />
          <TooltipButton button={
            <p onClick={() => addCode("textblock")}>
              <LucideTextQuote size={20} />
            </p>} content="textblock" />
          <TooltipButton button={
            <p onClick={() => subAddCode("code")}>
              <Code2 size={20} />
            </p>} content="code" />
          <TooltipButton button={
            <p onClick={() => subAddCode("strikethrough")}>
              <Strikethrough size={20} />
            </p>} content="strikethrough" />
        </div>
      </div>
      <div className="flex items-center justify-end">
        <div className="flex items-center">
          <button
            onClick={togglePreview}
            className="max-sm:flex hidden items-center gap-2 px-3 py-1.5 rounded text-sm"
          >
            {isPreview ? <FileEdit size={18} /> : <Eye size={18} />}
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 rounded text-sm"
            title="Copy to clipboard"
          >
            <Copy size={18} />
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-1.5 rounded text-sm"
            title="Download markdown"
          >
            <Download size={18} />
          </button>
        </div>
      </div>
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        className="overflow-y flex-1 w-full px-4 text-[#274c77] font-mono resize-none focus:outline-none"
        placeholder="Write your markdown here..."
        autoFocus
        id="texteditorId"
      />
      {/* <div className="h-10 flex items-center gap-2 py-2 justify-end bg-white rounded-b-xl border-t-2 border-black">
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
      </div> */}
    </div>
  );
}
