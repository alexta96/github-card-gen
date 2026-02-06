"use client";

import { motion } from "framer-motion";
import { MapPin, Users, Link as LinkIcon, Github } from "lucide-react";

interface UserCardProps {
  user: any;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md bg-white border border-zinc-200 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-black"
    >
      {/* Cabecera: Avatar y Nombres */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-20 h-20 rounded-full grayscale hover:grayscale-0 transition-all duration-500 border border-zinc-100"
        />
        <div>
          <h2 className="text-2xl font-semibold tracking-tight leading-none mb-2">
            {user.name || user.login}
          </h2>
          <a
            href={user.html_url}
            target="_blank"
            className="text-zinc-400 font-light hover:text-black transition-colors flex items-center gap-1"
          >
            @{user.login} <Github size={12} />
          </a>
        </div>
      </div>

      {/* Bio */}
      {user.bio && (
        <p className="text-zinc-600 font-light leading-relaxed mb-8">
          {user.bio}
        </p>
      )}

      {/* Stats - Grid de 3 columnas */}
      <div className="grid grid-cols-3 border-y border-zinc-100 py-6 mb-8">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">Repos</p>
          <p className="text-lg font-medium">{user.public_repos}</p>
        </div>
        <div className="text-center border-x border-zinc-100">
          <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">Followers</p>
          <p className="text-lg font-medium">{user.followers}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">Following</p>
          <p className="text-lg font-medium">{user.following}</p>
        </div>
      </div>

      {/* Detalles Extra */}
      <div className="space-y-3">
        {user.location && (
          <div className="flex items-center gap-3 text-zinc-500 text-sm">
            <MapPin size={16} strokeWidth={1.5} />
            <span>{user.location}</span>
          </div>
        )}
        {user.blog && (
          <div className="flex items-center gap-3 text-zinc-500 text-sm">
            <LinkIcon size={16} strokeWidth={1.5} />
            <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" className="hover:text-black truncate">
              {user.blog}
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}