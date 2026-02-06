"use client";

import { useState } from "react";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";

export default function Home() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<any[]>([]);

  const handleSearch = async (username: string) => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      
      if (!response.ok) {
        throw new Error("El usuario no existe");
      }

      const data = await response.json();
      setUserData(data);

      // Lógica del historial: evitar duplicados y máximo 3
      setHistory((prev) => {
        const filtered = prev.filter((u) => u.login !== data.login);
        return [data, ...filtered].slice(0, 3);
      });

    } catch (err: any) {
      setError(err.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <div className="max-w-2xl mx-auto pt-32 px-6 flex flex-col items-center">
        
        {/* Título Minimalista */}
        <h1 className="text-[10px] font-medium uppercase tracking-[0.3em] mb-16 text-zinc-400">
          GitHub Profile Explorer
        </h1>

        {/* Buscador */}
        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {/* Estados de Carga y Error */}
        <div className="h-12 flex items-center">
          {loading && <p className="text-xs animate-pulse text-zinc-400">Buscando datos...</p>}
          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        </div>

        {/* Resultado: La Card */}
        {userData && (
          <div className="mt-4 w-full flex justify-center">
            <UserCard user={userData} />
          </div>
        )}

        {/* Historial de búsquedas */}
        {history.length > 0 && (
          <div className="mt-20 w-full max-w-md">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-6 text-center">
              Recientes
            </p>
            <div className="flex justify-center gap-6">
              {history.map((user) => (
                <button
                  key={user.login}
                  onClick={() => setUserData(user)}
                  className="group flex flex-col items-center gap-2 transition-transform hover:-translate-y-1"
                >
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-10 h-10 rounded-full grayscale group-hover:grayscale-0 border border-zinc-100 shadow-sm transition-all"
                  />
                  <span className="text-[9px] text-zinc-400">@{user.login}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}