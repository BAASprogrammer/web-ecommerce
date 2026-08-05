"use client";
import { MessageSquare } from "lucide-react";
import { useContactMessages } from "@/hooks/data/useContactMessages";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function ContactMessagesPanel() {
  const { data, isLoading, isError } = useContactMessages();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        <span className="w-[22px] h-[22px] border-2 border-gray-300 border-t-brand rounded-full animate-spin inline-block mr-3" />
        Cargando mensajes...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-2xl border border-red-200 p-10 text-center text-red-500 text-sm font-medium">
        No se pudieron cargar los mensajes. Verifica que notification-service esté corriendo.
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
        <MessageSquare size={32} className="mx-auto mb-3 text-gray-300" />
        <p className="text-gray-500 text-sm font-medium">
          No hay mensajes de contacto todavía.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[0.9rem] text-gray-500">
        {data.length} mensaje{data.length !== 1 && "s"} recibido{data.length !== 1 && "s"}
      </p>
      {data.map((m) => (
        <article
          key={m.id}
          className="bg-white rounded-2xl border border-gray-200 p-5"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h3 className="font-bold text-gray-900 text-[0.95rem]">
                {m.subject}
              </h3>
              <p className="text-sm text-gray-500">
                {m.name} ·{" "}
                <a href={`mailto:${m.email}`} className="text-brand hover:underline">
                  {m.email}
                </a>
              </p>
            </div>
            <time className="text-xs text-gray-400 whitespace-nowrap">
              {formatDate(m.createdAt)}
            </time>
          </div>
          <p className="mt-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {m.message}
          </p>
        </article>
      ))}
    </div>
  );
}
