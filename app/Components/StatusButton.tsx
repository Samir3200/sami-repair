"use client";

import { useTransition } from "react";

interface Props {
  id: number;
  active: boolean;
  labelActive: string;
  labelInactive: string;
  colorActive: string;
  colorInactive: string;
  action: (id: number, current: boolean) => Promise<any>;
}

export default function StatusButton({ id, active, labelActive, labelInactive, colorActive, colorInactive, action }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => action(id, active))}
      disabled={isPending}
      className={`px-3 py-1 rounded-full text-xs font-bold transition-opacity cursor-pointer ${isPending ? "opacity-50" : "opacity-100"} ${
        active ? colorActive : colorInactive
      }`}
    >
      {active ? labelActive : labelInactive}
    </button>
  );
}