"use client";

import { Editor } from "@monaco-editor/react";
import React from "react";
import type { Snippet } from "@prisma/client";
import { Button } from "./button";
import { saveSnippet } from "@/actions";
import { Copy, Moon, Sun, Save, Play } from "lucide-react";
import { useRouter } from "next/navigation";

function EditSnippet({ snippet }: { snippet: Snippet }) {
  const [code, setCode] = React.useState(snippet.code);
  const [language, setLanguage] = React.useState("javascript");
  const [theme, setTheme] = React.useState<"vs-dark" | "light">("vs-dark");
  const [isSaving, setIsSaving] = React.useState(false);
  const [isRunning, setIsRunning] = React.useState(false);
  const [output, setOutput] = React.useState<string>("");
  const router = useRouter();

  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  const clearOutput = () => {
    setOutput("");
    // Remove any existing iframes
    const outputElement = document.querySelector('.output-area');
    if (outputElement) {
      const iframes = outputElement.querySelectorAll('iframe');
      iframes.forEach(iframe => iframe.remove());
    }
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

  // Clear output when language changes
  React.useEffect(() => {
    clearOutput();
  }, [language]);

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

  // --- RUN FUNCTIONALITY ---
  const handleRun = async () => {
    setIsRunning(true);
    clearOutput();
    try {
      if (language === "javascript" || language === "jsx" || language === "typescript" || language === "tsx") {
        // Create a safe execution environment for JS/TS
        const logs: string[] = [];
        const originalConsoleLog = console.log;
        const originalConsoleError = console.error;
        const originalConsoleWarn = console.warn;
        const originalConsoleInfo = console.info;

        // Override console methods to capture output
        console.log = (...args) => {
          logs.push(args.map(arg => String(arg)).join(' '));
          originalConsoleLog(...args);
        };
        console.error = (...args) => {
          logs.push(`ERROR: ${args.map(arg => String(arg)).join(' ')}`);
          originalConsoleError(...args);
        };
        console.warn = (...args) => {
          logs.push(`WARN: ${args.map(arg => String(arg)).join(' ')}`);
          originalConsoleWarn(...args);
        };
        console.info = (...args) => {
          logs.push(`INFO: ${args.map(arg => String(arg)).join(' ')}`);
          originalConsoleInfo(...args);
        };

        try {
          // Execute the code
          const result = new Function(code)();
          
          // Restore original console methods
          console.log = originalConsoleLog;
          console.error = originalConsoleError;
          console.warn = originalConsoleWarn;
          console.info = originalConsoleInfo;

          // Show logs and result
          let outputText = '';
          if (logs.length > 0) {
            outputText += logs.join('\n');
          }
          if (result !== undefined) {
            if (outputText) outputText += '\n';
            outputText += `Return value: ${String(result)}`;
          }
          if (!outputText) {
            outputText = '(Code executed successfully, no output)';
          }
          setOutput(outputText);
        } catch (err: any) {
          // Restore original console methods
          console.log = originalConsoleLog;
          console.error = originalConsoleError;
          console.warn = originalConsoleWarn;
          console.info = originalConsoleInfo;
          
          setOutput(`Error: ${err.message}`);
        }
      } else if (language === "python") {
        // Python execution - show instructions and code
        setOutput("Python execution is available in the browser, but requires additional setup.\n\nFor Python code execution, you can:\n1. Use online Python interpreters like repl.it, python.org/shell, or pythontutor.com\n2. Install Python locally\n3. Use Jupyter notebooks\n\nYour Python code:\n" + code + "\n\nTo run this code:\n1. Copy the code above\n2. Visit https://repl.it/languages/python3\n3. Paste and run your code");
      } else if (language === "cpp" || language === "c") {
        // C++ execution using WASM (simplified)
        setOutput("C++ execution is not yet supported in the browser.\n\nFor C++ code execution, you can:\n1. Use online compilers like repl.it, cpp.sh, or godbolt.org\n2. Install a local C++ compiler\n3. Use Docker containers\n\nYour code:\n" + code);
      } else if (language === "java") {
        // Java execution (simplified - show instructions)
        setOutput("Java execution is not yet supported in the browser.\n\nFor Java code execution, you can:\n1. Use online compilers like repl.it, programiz.com, or codingground.tutorialspoint.com\n2. Install JDK locally\n3. Use Docker containers\n\nYour code:\n" + code);
      } else if (language === "html") {
        // HTML execution - show in iframe
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Preview</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .preview-container { border: 2px solid #ccc; border-radius: 8px; margin: 10px 0; }
    </style>
</head>
<body>
    ${code}
</body>
</html>`;
        
        setOutput("HTML Preview:\n\n" + code + "\n\n--- Live Preview ---\n(HTML code shown above)");
        
        // Create a blob URL for the iframe
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // Add iframe to the output area after a short delay
        setTimeout(() => {
          const outputElement = document.querySelector('.output-area');
          if (outputElement) {
            // Remove any existing iframes first
            const existingIframes = outputElement.querySelectorAll('iframe');
            existingIframes.forEach(iframe => iframe.remove());
            
            const iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.style.width = '100%';
            iframe.style.height = '300px';
            iframe.style.border = '1px solid #ccc';
            iframe.style.borderRadius = '8px';
            iframe.style.marginTop = '10px';
            iframe.style.backgroundColor = 'white';
            outputElement.appendChild(iframe);
            
            // Clean up the blob URL after iframe loads
            iframe.onload = () => {
              URL.revokeObjectURL(url);
            };
          }
        }, 100);
      } else if (language === "css") {
        // CSS execution - show with sample HTML
        const sampleHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Preview</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .preview-container { border: 2px solid #ccc; border-radius: 8px; margin: 10px 0; }
        ${code}
    </style>
</head>
<body>
    <h1>CSS Preview</h1>
    <div class="sample">Sample content to see CSS effects</div>
    <p>This is a paragraph with some text</p>
    <button>Sample Button</button>
    <div class="box">Box with custom styling</div>
    <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
    </ul>
</body>
</html>`;
        
        setOutput("CSS Preview (with sample HTML):\n\n" + code + "\n\n--- Live Preview ---\n(CSS applied to sample HTML)");
        
        // Create a blob URL for the iframe
        const blob = new Blob([sampleHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // Add iframe to the output area after a short delay
        setTimeout(() => {
          const outputElement = document.querySelector('.output-area');
          if (outputElement) {
            // Remove any existing iframes first
            const existingIframes = outputElement.querySelectorAll('iframe');
            existingIframes.forEach(iframe => iframe.remove());
            
            const iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.style.width = '100%';
            iframe.style.height = '400px';
            iframe.style.border = '1px solid #ccc';
            iframe.style.borderRadius = '8px';
            iframe.style.marginTop = '10px';
            iframe.style.backgroundColor = 'white';
            outputElement.appendChild(iframe);
            
            // Clean up the blob URL after iframe loads
            iframe.onload = () => {
              URL.revokeObjectURL(url);
            };
          }
        }, 100);
      } else if (language === "sql") {
        // SQL execution - show syntax check
        setOutput("SQL Query:\n\n" + code + "\n\n(SQL execution requires a database connection. Use tools like SQLite, MySQL, or PostgreSQL for actual execution.)");
      } else if (language === "json") {
        // JSON validation
        try {
          const parsed = JSON.parse(code);
          setOutput("Valid JSON:\n\n" + JSON.stringify(parsed, null, 2));
        } catch (err: any) {
          setOutput("Invalid JSON:\n\n" + err.message);
        }
      } else {
        setOutput("Run is only supported for JavaScript/TypeScript snippets in the browser.\n\nFor other languages, use appropriate online compilers or local development environments:\n• Python: repl.it, python.org/shell\n• C++: repl.it, cpp.sh, godbolt.org\n• Java: repl.it, programiz.com\n• HTML/CSS: Live preview available above");
      }
    } finally {
      setIsRunning(false);
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
            <Button type="button" onClick={handleRun} disabled={isRunning} className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
              <Play className="w-4 h-4" />
              {isRunning ? "Running..." : "Run"}
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
      {/* Output Area */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <Play className="w-4 h-4 text-green-500" /> Output
        </h3>
        <div className="output-area bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-4 font-mono text-sm min-h-[48px] whitespace-pre-wrap text-gray-800 dark:text-gray-100">
          {output || <span className="text-gray-400">(No output yet. Click Run to execute your code.)</span>}
        </div>
      </div>
    </div>
  );
}

export default EditSnippet;
