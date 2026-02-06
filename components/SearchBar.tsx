"use client";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    if (username.trim()) onSearch(username);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md group">
      <input
        name="username"
        type="text"
        placeholder="Escribe un usuario de GitHub..."
        className="w-full bg-white border-b border-black py-4 pl-2 pr-12 outline-none text-xl font-light tracking-tight placeholder:text-zinc-300 focus:border-zinc-400 transition-all"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:scale-110 transition-transform disabled:opacity-30"
      >
        <Search size={20} strokeWidth={1.5} />
      </button>
    </form>
  );
}