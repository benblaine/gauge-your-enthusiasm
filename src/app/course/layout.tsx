import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";

export default function CourseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-0">
      <Sidebar />
      <div className="flex-1 min-w-0 px-4 md:px-8 py-8">{children}</div>
    </div>
  );
}
