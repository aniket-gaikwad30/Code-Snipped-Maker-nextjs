"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Search, Sparkles, Code, Tag, Trash2 } from "lucide-react";
import { deleteSnippet } from "@/actions";

interface Snippet {
  id: number;
  title: string;
  code: string;
  tags: string;
}

export default function SnippetListClient({ snippets }: { snippets: Snippet[] }) {
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
  
  // Parse tags from JSON strings and get all unique tags
  const allTags = Array.from(
    new Set(
      snippets.flatMap(s => {
        try {
          return JSON.parse(s.tags || "[]");
        } catch {
          return [];
        }
      })
    )
  );
  
  const filtered = snippets.filter(s => {
    const snippetTags = (() => {
      try {
        return JSON.parse(s.tags || "[]");
      } catch {
        return [];
      }
    })();
    
    return (
      (!search || s.title.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase())) &&
      (!tagFilter || snippetTags.includes(tagFilter))
    );
  });
  
  const handleDelete = async (snippetId: number) => {
    if (!confirm("Are you sure you want to delete this snippet? This action cannot be undone.")) {
      return;
    }
    
    setDeletingIds(prev => new Set(prev).add(snippetId));
    try {
      const result = await deleteSnippet(snippetId);
      if (result && result.message) {
        // If there's an error message, show it
        alert(result.message);
        setDeletingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(snippetId);
          return newSet;
        });
      }
      // If no result or no message, the redirect should happen automatically
    } catch (error) {
      console.error("Error deleting snippet:", error);
      alert("Failed to delete snippet. Please try again.");
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(snippetId);
        return newSet;
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8 relative">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-float opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-pink-400 rounded-full animate-float opacity-50" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-60 left-1/2 w-1 h-1 bg-indigo-400 rounded-full animate-float opacity-30" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Enhanced Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Code className="w-8 h-8 text-blue-400 animate-pulse" />
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text neon-glow">
            Code Snippet Maker
          </h1>
          <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Create, organize, and share your code snippets with beautiful syntax highlighting and smart tagging
        </p>
      </div>

      {/* Enhanced Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <div className="relative w-full max-w-md">
          <input
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 font-sans text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 backdrop-blur-md focus-glow"
            placeholder="Search snippets..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        </div>
        <div className="relative">
          <select
            className="appearance-none pl-10 pr-8 py-3 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 font-sans text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 backdrop-blur-md focus-glow"
            value={tagFilter}
            onChange={e => setTagFilter(e.target.value)}
          >
            <option value="">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          <Tag className="absolute left-3 top-3.5 text-gray-400" size={20} />
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-6 text-center">
        <div className="bg-white/60 dark:bg-gray-900/60 rounded-xl p-4 backdrop-blur-md border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold gradient-text">{snippets.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Snippets</div>
        </div>
        <div className="bg-white/60 dark:bg-gray-900/60 rounded-xl p-4 backdrop-blur-md border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold gradient-text">{allTags.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Unique Tags</div>
        </div>
      </div>

      {/* Enhanced Snippet List */}
      <div className="space-y-6">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse-glow">
              <Code className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No snippets found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {search || tagFilter ? "Try adjusting your search or filters" : "Create your first snippet to get started!"}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((snippet) => {
              const snippetTags = (() => {
                try {
                  return JSON.parse(snippet.tags || "[]");
                } catch {
                  return [];
                }
              })();
              
              return (
                <div
                  key={snippet.id}
                  className="group relative border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white/90 via-blue-50/80 to-purple-50/80 dark:from-gray-900/90 dark:via-blue-900/80 dark:to-purple-900/80 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-md overflow-hidden card-hover"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate max-w-xs group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {snippet.title}
                      </h3>
                      <div className="flex gap-2">
                        <Link href={`/snippet/${snippet.id}`}>
                          <Button variant="outline" className="text-sm glossy-btn animate-pulse-glow">
                            View
                          </Button>
                        </Link>
                        <button
                          onClick={() => handleDelete(snippet.id)}
                          disabled={deletingIds.has(snippet.id)}
                          className="text-sm px-3 py-1 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 hover:text-red-700 dark:hover:text-red-300 transition-all duration-200 disabled:opacity-50 flex items-center gap-1 group"
                          title="Delete snippet"
                        >
                          <Trash2 size={14} className="group-hover:scale-110 transition-transform" />
                          {deletingIds.has(snippet.id) ? "..." : ""}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {snippetTags.map((tag: string) => (
                        <span key={tag} className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-mono animate-in fade-in shadow-md hover:scale-105 transition-transform">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-mono line-clamp-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                      {snippet.code.slice(0, 100)}
                      {snippet.code.length > 100 && "..."}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Enhanced Floating Button */}
      <Link href="/snippet/new">
        <button className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl rounded-full p-5 hover:scale-110 transition-all duration-300 animate-float focus-glow">
          <Plus className="w-8 h-8" />
        </button>
      </Link>
    </div>
  );
} 