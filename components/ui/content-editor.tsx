"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  ImageIcon,
  Code,
  Heading1,
  Heading2,
  LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
} from "lucide-react";

interface ContentEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
}

export function ContentEditor({ initialContent = "", onChange }: ContentEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [codeContent, setCodeContent] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("sql");

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && initialContent !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = initialContent;
    }
  }, [initialContent]);

  // Handle content changes
  const handleContentChange = () => {
    if (editorRef.current && onChange) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  };

  // Execute editor commands
  const execCommand = (command: string, value: string = "") => {
    // Ensure editor is focused
    if (editorRef.current) {
      editorRef.current.focus();
    }
    const success = document.execCommand(command, false, value);
    if (!success) {
      console.warn(`Failed to execute command: ${command}`);
    }
    handleContentChange();
  };

  // Toggle list state
  const toggleList = (type: "unordered" | "ordered") => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const parent = range.commonAncestorContainer;
      const isInList = parent.nodeType === Node.ELEMENT_NODE && parent.closest(`ul, ol`);

      if (isInList) {
        // If already in a list, remove list formatting
        document.execCommand("outdent");
      } else {
        // Apply list formatting
        document.execCommand(type === "unordered" ? "insertUnorderedList" : "insertOrderedList");
      }
      handleContentChange();
    }
  };

  const handleBold = () => execCommand("bold");
  const handleItalic = () => execCommand("italic");
  const handleUnorderedList = () => toggleList("unordered");
  const handleOrderedList = () => toggleList("ordered");
  const handleAlign = (align: string) => execCommand("justify" + align);
  const handleUndo = () => execCommand("undo");
  const handleRedo = () => execCommand("redo");

  const handleHeading = (level: number) => {
    execCommand("formatBlock", `h${level}`);
  };

  const handleImageInsert = () => {
    if (imageUrl) {
      const alt = imageAlt || "Lesson image";
      execCommand("insertHTML", `<img src="${imageUrl}" alt="${alt}" class="my-4 rounded max-w-full" />`);
      setImageUrl("");
      setImageAlt("");
      setIsImageModalOpen(false);
    }
  };

  const handleLinkInsert = () => {
    if (linkUrl && linkText) {
      execCommand(
        "insertHTML",
        `<a href="${linkUrl}" target="_blank" class="text-blue-600 hover:underline">${linkText}</a>`,
      );
      setLinkUrl("");
      setLinkText("");
      setIsLinkModalOpen(false);
    }
  };

  const handleCodeInsert = () => {
    if (codeContent) {
      const formattedCode = codeContent
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

      execCommand(
        "insertHTML",
        `<pre><code class="language-${codeLanguage} bg-gray-100 block p-4 rounded overflow-x-auto text-sm font-mono">${formattedCode}</code></pre>`,
      );
      setCodeContent("");
      setIsCodeModalOpen(false);
    }
  };

  return (
    <div className="border-0 w-full" style={{ direction: "ltr" }}>
      <div className="bg-white p-2 border-b flex flex-wrap gap-1 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-1 mr-2">
          <button type="button" onClick={handleUndo} className="p-2 rounded hover:bg-gray-100" title="Undo">
            <Undo className="h-4 w-4" />
          </button>
          <button type="button" onClick={handleRedo} className="p-2 rounded hover:bg-gray-100" title="Redo">
            <Redo className="h-4 w-4" />
          </button>
        </div>
        <div className="w-px h-6 bg-gray-200 mx-1 self-center"></div>
        <div className="flex items-center space-x-1 mr-2">
          <button type="button" onClick={handleBold} className="p-2 rounded hover:bg-gray-100" title="Bold">
            <Bold className="h-4 w-4" />
          </button>
          <button type="button" onClick={handleItalic} className="p-2 rounded hover:bg-gray-100" title="Italic">
            <Italic className="h-4 w-4" />
          </button>
        </div>
        <div className="w-px h-6 bg-gray-200 mx-1 self-center"></div>
        <div className="flex items-center space-x-1 mr-2">
          <button
            type="button"
            onClick={() => handleHeading(2)}
            className="p-2 rounded hover:bg-gray-100"
            title="Heading"
          >
            <Heading1 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleHeading(3)}
            className="p-2 rounded hover:bg-gray-100"
            title="Subheading"
          >
            <Heading2 className="h-4 w-4" />
          </button>
        </div>
        <div className="w-px h-6 bg-gray-200 mx-1 self-center"></div>
        <div className="flex items-center space-x-1 mr-2">
          <button
            type="button"
            onClick={handleUnorderedList}
            className="p-2 rounded hover:bg-gray-100"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleOrderedList}
            className="p-2 rounded hover:bg-gray-100"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
        </div>
        <div className="w-px h-6 bg-gray-200 mx-1 self-center"></div>
        <div className="flex items-center space-x-1 mr-2">
          <button
            type="button"
            onClick={() => handleAlign("Left")}
            className="p-2 rounded hover:bg-gray-100"
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleAlign("Center")}
            className="p-2 rounded hover:bg-gray-100"
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleAlign("Right")}
            className="p-2 rounded hover:bg-gray-100"
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </button>
        </div>
        <div className="w-px h-6 bg-gray-200 mx-1 self-center"></div>
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => setIsImageModalOpen(true)}
            className="p-2 rounded hover:bg-gray-100"
            title="Insert Image"
          >
            <ImageIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsLinkModalOpen(true)}
            className="p-2 rounded hover:bg-gray-100"
            title="Insert Link"
          >
            <LinkIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsCodeModalOpen(true)}
            className="p-2 rounded hover:bg-gray-100"
            title="Insert Code Block"
          >
            <Code className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="p-6 min-h-[400px] focus:outline-none prose max-w-none"
        onInput={handleContentChange}
        style={{ direction: "ltr", unicodeBidi: "isolate" }}
      />

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Insert Image</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="image-url" className="block text-sm font-medium mb-1">
                  Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  id="image-url"
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="image-alt" className="block text-sm font-medium mb-1">
                  Alt Text
                </label>
                <input
                  id="image-alt"
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Description of the image"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsImageModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded-md text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleImageInsert}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                  disabled={!imageUrl}
                >
                  Insert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Insert Link</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="link-text" className="block text-sm font-medium mb-1">
                  Link Text <span className="text-red-500">*</span>
                </label>
                <input
                  id="link-text"
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Click here"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="link-url" className="block text-sm font-medium mb-1">
                  URL <span className="text-red-500">*</span>
                </label>
                <input
                  id="link-url"
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLinkModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded-md text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleLinkInsert}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                  disabled={!linkUrl || !linkText}
                >
                  Insert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Code Modal */}
      {isCodeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-medium mb-4">Insert Code Block</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="code-language" className="block text-sm font-medium mb-1">
                  Language
                </label>
                <select
                  id="code-language"
                  value={codeLanguage}
                  onChange={(e) => setCodeLanguage(e.target.value)}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                >
                  <option value="sql">SQL</option>
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="bash">Bash</option>
                  <option value="json">JSON</option>
                </select>
              </div>
              <div>
                <label htmlFor="code-content" className="block text-sm font-medium mb-1">
                  Code <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="code-content"
                  value={codeContent}
                  onChange={(e) => setCodeContent(e.target.value)}
                  placeholder="Enter your code here..."
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 font-mono h-40"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCodeModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded-md text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCodeInsert}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                  disabled={!codeContent}
                >
                  Insert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}