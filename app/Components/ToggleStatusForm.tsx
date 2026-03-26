"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface ToggleStatusFormProps {
  id: number;
  currentStatus: boolean;
  action: (formData: FormData) => void | Promise<void>;
  labelActive: string;
  labelInactive: string;
  colorActive: string;
  colorInactive: string;
}

export default function ToggleStatusForm({
  id,
  currentStatus,
  action,
  labelActive,
  labelInactive,
  colorActive,
  colorInactive,
}: ToggleStatusFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleAction(formData: FormData) {
    await action(formData);
    router.refresh();
  }

  return (
    <form action={handleAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="currentStatus" value={String(!!currentStatus)} />
      <button
        type="submit"
        disabled={isPending}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-opacity ${isPending ? "opacity-50" : "opacity-100"} ${currentStatus ? colorActive : colorInactive}`}
      >
        {currentStatus ? labelActive : labelInactive}
      </button>
    </form>
  );
}
