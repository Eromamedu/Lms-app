import { InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
}

export default function Input({
  label,
  icon: Icon,
  ...props
}: Props) {
  return (
    <div className="space-y-2">

      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="flex items-center rounded-xl border border-slate-300 bg-white px-4 focus-within:border-blue-600">

        <Icon size={18} className="text-slate-400" />

        <input
          className="w-full bg-transparent p-4 outline-none"
          {...props}
        />

      </div>

    </div>
  );
}