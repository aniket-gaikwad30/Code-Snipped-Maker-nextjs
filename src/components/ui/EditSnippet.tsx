"use client";

import { Editor } from "@monaco-editor/react";
import React from "react";
import type { Snippet } from "@prisma/client";
import { Button } from "./button";
import { saveSnippet } from "@/actions";
import { Copy, Moon, Sun, Save } from "lucide-react";
import { useRouter } from "next/navigation";

function EditSnippet({ snippet }: { snippet: Snippet }) {
  const [code, setCode] = React.useState(snippet.code);
  const [language, setLanguage] = React.useState("javascript");
  const [theme, setTheme] = React.useState<"vs-dark" | "light">("vs-dark");
  const [isSaving, setIsSaving] = React.useState(false);
  const router = useRouter();

  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  const handleCopySelected = () => {
    const selection = window.getSelection()?.toString();
    if (selection) {
      navigator.clipboard.writeText(selection);
      alert("Selected code copied!");
    } else {
      alert("Please select some code to copy.");
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "vs-dark" ? "light" : "vs-dark"));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const result = await saveSnippet(snippet.id, code);
      if (result.success) {
        router.push(`/snippet/${snippet.id}`);
      } else {
        alert(result.message || "Failed to save snippet");
      }
    } catch {
      alert("An error occurred while saving");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSave} className="space-y-6">
        {/* Header Controls */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Code Editor</h2>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={handleCopySelected} className="flex items-center gap-2">
              <Copy className="w-4 h-4" />
              Copy Selected
            </Button>
            <Button type="button" variant="outline" onClick={toggleTheme} className="flex items-center gap-2">
              {theme === "vs-dark" ? (
                <>
                  <Sun className="w-4 h-4" />
                  Light
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" />
                  Dark
                </>
              )}
            </Button>
            <Button type="submit" disabled={isSaving} className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-3">
          <label htmlFor="lang" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Language:
          </label>
          <select
            id="lang"
            className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="jsx">JSX</option>
            <option value="tsx">TSX</option>
            <option value="json">JSON</option>
            <option value="sql">SQL</option>
          </select>
        </div>

        {/* Monaco Editor */}
        <div className="border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden shadow-lg">
          <Editor
            height="60vh"
            language={language}
            value={code}
            theme={theme}
            onChange={handleEditorChange}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              wordWrap: "on",
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default EditSnippet;
