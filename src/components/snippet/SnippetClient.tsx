// src/components/snippet/SnippetClient.tsx

"use client";

import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/duotoneDark";
import { motion } from "framer-motion";

type SnippetProps = {
  snippet: {
    id: number;
    title: string;
    code: string;
  };
};

const SnippetClient = ({ snippet }: SnippetProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      alert("Code copied to clipboard!");
    } catch (err) {
      alert("Failed to copy!");
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto px-4 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">{snippet.title}</h1>
        <button
          onClick={handleCopy}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Copy Code
        </button>
      </div>

      <Highlight
        {...defaultProps}
        theme={theme}
        code={snippet.code.trim()}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} rounded-lg overflow-x-auto`}
            style={{ ...style, padding: "20px" }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </motion.div>
  );
};

export default SnippetClient;
