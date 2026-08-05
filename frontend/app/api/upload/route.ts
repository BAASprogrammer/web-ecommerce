import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const ALLOWED_MIME = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "No se envió ningún archivo" }, { status: 400 });
    }
    if (!ALLOWED_MIME.has(file.type)) {
      return NextResponse.json({ message: "Formato de imagen no permitido" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ message: "La imagen supera los 5 MB" }, { status: 400 });
    }

    const ext = (file.name.split(".").pop() ?? "png").toLowerCase();
    const base = path.basename(file.name, path.extname(file.name)).replace(/[^a-z0-9_-]+/gi, "-");
    const filename = `${base}-${Date.now()}.${ext}`;

    const dir = path.join(process.cwd(), "public", "products");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, filename), Buffer.from(await file.arrayBuffer()));

    return NextResponse.json({ url: `/products/${filename}` }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "No se pudo subir la imagen" }, { status: 500 });
  }
}
