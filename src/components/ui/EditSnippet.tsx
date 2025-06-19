"use client";

import { Editor } from "@monaco-editor/react";
import React from "react";
import type { Snippet } from "@prisma/client";
import { Button } from "./button";
import { saveSnippet } from "@/actions";
import { Copy, Moon, Sun } from "lucide-react";
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
    <div className="space-y-4">
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-lg">Your Code Editor</h1>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={handleCopySelected}>
              <Copy className="w-4 h-4 mr-1" />
              Copy Selected
            </Button>
            <Button type="button" variant="ghost" onClick={toggleTheme}>
              {theme === "vs-dark" ? (
                <Sun className="w-4 h-4 mr-1" />
              ) : (
                <Moon className="w-4 h-4 mr-1" />
              )}
              {theme === "vs-dark" ? "Light" : "Dark"}
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <label htmlFor="lang" className="text-sm font-medium">
            Language:
          </label>
          <select
            id="lang"
            className="border px-2 py-1 rounded"
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
          </select>
        </div>

        <Editor
          height="50vh"
          language={language}
          value={code}
          theme={theme}
          onChange={handleEditorChange}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
          }}
        />
      </form>
    </div>
  );
}

export default EditSnippet;
