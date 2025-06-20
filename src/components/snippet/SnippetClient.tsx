// src/components/snippet/SnippetClient.tsx

"use client";

import React, { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, ArrowLeft, Code, Tag, Edit } from "lucide-react";
import Link from "next/link";

type SnippetProps = {
  snippet: {
    id: number;
    title: string;
    code: string;
    tags?: string;
  };
};

const SnippetClient = ({ snippet }: SnippetProps) => {
  const [copied, setCopied] = useState(false);
  
  // Parse tags from JSON string
  const tags = (() => {
    try {
      return JSON.parse(snippet.tags || "[]");
    } catch {
      return [];
    }
  })();
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // handle error silently
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <motion.div
        className="max-w-4xl mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Snippets
        </Link>

        {/* Main Content Card */}
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl backdrop-blur-md border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-8 h-8 animate-pulse" />
                <h1 className="text-3xl sm:text-4xl font-bold neon-glow">
                  {snippet.title}
                </h1>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag: string) => (
                  <span key={tag} className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-mono animate-in fade-in shadow-md">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {/* Edit Button */}
                <Link
                  href={`/snippet/${snippet.id}/edit`}
                  className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl shadow-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2 group"
                >
                  <Edit className="w-5 h-5" />
                  Edit
                </Link>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl shadow-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2 group"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        Copied!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                      >
                        <Copy className="w-5 h-5" />
                        Copy Code
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>

          {/* Code Section */}
          <div className="p-8">
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-800">
              <div className="bg-gray-800 px-6 py-3 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm font-mono">Code Snippet</span>
              </div>
              
              <Highlight
                theme={themes.duotoneDark}
                code={snippet.code.trim()}
                language="tsx"
              >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre
                    className={`${className} p-6 overflow-x-auto font-mono text-sm leading-relaxed`}
                    style={{ ...style }}
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line, key: i })} className="hover:bg-gray-800/50 transition-colors">
                        <span className="text-gray-500 mr-4 select-none">{i + 1}</span>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/60 dark:bg-gray-900/60 rounded-xl p-4 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl font-bold gradient-text">{snippet.code.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Characters</div>
          </div>
          <div className="bg-white/60 dark:bg-gray-900/60 rounded-xl p-4 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl font-bold gradient-text">{snippet.code.split('\n').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Lines</div>
          </div>
          <div className="bg-white/60 dark:bg-gray-900/60 rounded-xl p-4 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl font-bold gradient-text">{tags.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Tags</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SnippetClient;
