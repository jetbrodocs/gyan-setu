import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({
  title,
  description = "This module will be implemented in an upcoming phase.",
}: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <Construction className="h-12 w-12 text-slate-300 mb-4" />
      <h2 className="text-xl font-semibold text-navy">{title}</h2>
      <p className="text-sm text-slate-500 mt-2 max-w-md">{description}</p>
    </div>
  );
}
