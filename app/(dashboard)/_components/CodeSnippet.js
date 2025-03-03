'use client'; // Since we're using state (client-side)

import { useState } from 'react';
import styles from '../styles/code-snippet.css'; // Adjust path as needed

const CodeSnippet = ({ header, codeContent }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`code-snippet-box ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="code-header" onClick={toggleCollapse}>
        {header}
      </div>
      <div
        className="code-content"
        dangerouslySetInnerHTML={{ __html: codeContent }}
      />
    </div>
  );
};

export default CodeSnippet;