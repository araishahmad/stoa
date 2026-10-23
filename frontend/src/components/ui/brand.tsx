import { LuAsterisk } from "react-icons/lu";

export function Brand({ className = "" }: { className?: string }) {
  return <span className={`brand ${className}`} aria-label="Stoa"><span className="brand-mark" aria-hidden="true"><LuAsterisk strokeWidth={2.4} /></span><span>stoa</span></span>;
}
