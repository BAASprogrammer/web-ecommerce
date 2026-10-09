"use client";
import { usePathname } from "next/navigation";
import Chatbot from "@/components/ui/Chatbot";

export default function ClientLayout() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) return null;
  return <Chatbot />;
}
