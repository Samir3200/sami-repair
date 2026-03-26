"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <div className="relative mb-6 max-w-md mx-auto">
      <input
        type="text"
        className="w-full p-3 pl-10 border rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        placeholder="Rechercher un client ou un appareil..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <span className="absolute left-4 top-3.5 text-slate-400">🔍</span>
      {isPending && <span className="absolute right-4 top-3.5 text-xs text-blue-500 animate-pulse">...</span>}
    </div>
  );
}
