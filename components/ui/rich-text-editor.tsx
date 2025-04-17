"use client"

import React, { useState, useEffect } from "react"
import {
  Bold,
  Italic,
  Link,
  Code,
  ImageIcon,
  Video,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter content here...",
  className = "",
}: RichTextEditorProps) {
  const [editorContent, setEditorContent] = useState(value)
  const editorRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const handleContentChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML
      setEditorContent(content)
      onChange(content)
    }
  }

  const execCommand = (command: string, value: string | boolean = false) => {
    document.execCommand(command, false, value.toString())
    handleContentChange()
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  const insertMedia = (type: "image" | "video") => {
    const url = prompt(`Enter ${type} URL:`)
    if (url) {
      if (type === "image") {
        execCommand("insertHTML", `<img src="${url}" alt="Image" style="max-width: 100%; height: auto;" />`)
      } else {
        execCommand(
          "insertHTML",
          `<div class="video-container"><iframe src="${url}" frameborder="0" allowfullscreen></iframe></div>`,
        )
      }
    }
  }

  const insertCodeBlock = () => {
    execCommand("insertHTML", '<pre><code class="code-block">// Your code here</code></pre>')
  }

  return (
    <div className={`rich-text-editor-container border border-gray-300 rounded-md ${className}`}>
      <div className="toolbar flex flex-wrap gap-1 p-2 border-b border-gray-300 bg-gray-50">
        <button
          type="button"
          onClick={() => execCommand("bold")}
          className="p-1 rounded hover:bg-gray-200"
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => execCommand("italic")}
          className="p-1 rounded hover:bg-gray-200"
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter link URL:")
            if (url) execCommand("createLink", url)
          }}
          className="p-1 rounded hover:bg-gray-200"
          title="Insert Link"
        >
          <Link size={18} />
        </button>
        <button
          type="button"
          onClick={() => insertCodeBlock()}
          className="p-1 rounded hover:bg-gray-200"
          title="Insert Code Block"
        >
          <Code size={18} />
        </button>
        <button
          type="button"
          onClick={() => insertMedia("image")}
          className="p-1 rounded hover:bg-gray-200"
          title="Insert Image"
        >
          <ImageIcon size={18} />
        </button>
        <button
          type="button"
          onClick={() => insertMedia("video")}
          className="p-1 rounded hover:bg-gray-200"
          title="Insert Video"
        >
          <Video size={18} />
        </button>
        <button
          type="button"
          onClick={() => execCommand("insertUnorderedList")}
          className="p-1 rounded hover:bg-gray-200"
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => execCommand("insertOrderedList")}
          className="p-1 rounded hover:bg-gray-200"
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </button>
        <button
          type="button"
          onClick={() => execCommand("justifyLeft")}
          className="p-1 rounded hover:bg-gray-200"
          title="Align Left"
        >
          <AlignLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => execCommand("justifyCenter")}
          className="p-1 rounded hover:bg-gray-200"
          title="Align Center"
        >
          <AlignCenter size={18} />
        </button>
        <button
          type="button"
          onClick={() => execCommand("justifyRight")}
          className="p-1 rounded hover:bg-gray-200"
          title="Align Right"
        >
          <AlignRight size={18} />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="editor-content p-3 min-h-[200px] focus:outline-none"
        onInput={handleContentChange}
        onBlur={handleContentChange}
        placeholder={placeholder}
        dangerouslySetInnerHTML={{ __html: value }}
      />
      <style jsx global>{`
        .editor-content {
          overflow-y: auto;
        }
        .editor-content:empty:before {
          content: attr(placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        .editor-content img {
          max-width: 100%;
          height: auto;
        }
        .editor-content .video-container {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          margin-bottom: 1rem;
        }
        .editor-content .video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .editor-content .code-block {
          display: block;
          background-color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.25rem;
          font-family: monospace;
          white-space: pre-wrap;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  )
}
