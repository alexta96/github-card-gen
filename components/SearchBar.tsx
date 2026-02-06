"use client";
import { Search, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Lógica de búsqueda de sugerencias
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(`https://api.github.com/search/users?q=${query}&per_page=5`);
        const data = await res.json();
        setSuggestions(data.items || []);
        setShowDropdown(true);
      } catch (err) {
        console.error("Error buscando sugerencias", err);
      }
    };

    // "Debounce" simple: esperamos 300ms antes de llamar a la API
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(query);
          setShowDropdown(false);
        }} 
        className="relative group"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 3 && setShowDropdown(true)}
          type="text"
          placeholder="Escribe un usuario..."
          className="w-full bg-white border-b border-black py-4 pl-2 pr-12 outline-none text-xl font-light tracking-tight placeholder:text-zinc-300 focus:border-zinc-400 transition-all"
        />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2">
          {isLoading ? <Loader2 className="animate-spin text-zinc-400" size={20} /> : <Search size={20} strokeWidth={1.5} />}
        </button>
      </form>

      {/* Desplegable de Sugerencias */}
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border border-zinc-100 shadow-xl mt-1 rounded-b-xl overflow-hidden">
          {suggestions.map((user) => (
            <li key={user.id}>
              <button
                onClick={() => {
                  onSearch(user.login);
                  setQuery(user.login);
                  setShowDropdown(false);
                }}
                className="w-full flex items-center gap-3 p-3 hover:bg-zinc-50 transition-colors text-left"
              >
                <img src={user.avatar_url} className="w-8 h-8 rounded-full grayscale" alt="" />
                <span className="text-sm font-medium">{user.login}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}