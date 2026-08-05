"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, RotateCcw, LogOut, Eye } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar, { type AdminSection } from "@/components/admin/AdminSidebar";
import CategoryManager from "@/components/admin/CategoryManager";
import ContactMessagesPanel from "@/components/admin/ContactMessagesPanel";
import ProductFormModal from "@/components/products/ProductFormModal";
import ProductViewModal from "@/components/products/ProductViewModal";
import Pagination from "@/components/products/Pagination";
import { useProducts } from "@/context/ProductsContext";
import { useAuth } from "@/context/AuthContext";
import type { Product } from "@/types/api/product";

const formatPrice = (value: number) =>
  value.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

const ADMIN_PAGE_SIZE = 6;

export default function AdminPage() {
  const { user, isAdmin, logout } = useAuth();
  const router = useRouter();
  const { products, updateProduct, addProduct, deleteProduct, resetProducts } = useProducts();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | undefined>(undefined);
  const [viewing, setViewing] = useState<Product | undefined>(undefined);
  const [activeSection, setActiveSection] = useState<AdminSection>("productos");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAdmin) {
      router.replace("/login");
    }
  }, [mounted, isAdmin, router]);

  if (!mounted || !isAdmin) {
    return null;
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ADMIN_PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * ADMIN_PAGE_SIZE,
    safePage * ADMIN_PAGE_SIZE
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const openCreate = () => {
    setEditing(undefined);
    setModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setModalOpen(true);
  };

  const handleSave = (product: Product) => {
    if (editing) {
      updateProduct(product);
    } else {
      addProduct(product);
    }
    setModalOpen(false);
    setEditing(undefined);
  };

  const handleDelete = (product: Product) => {
    if (window.confirm(`¿Eliminar "${product.name}"?`)) {
      deleteProduct(product.id);
    }
  };

  return (
    <>
      <AdminHeader />
      <main className="flex-1 bg-gray-50">
        {/* Page header */}
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="text-[0.8125rem] text-gray-500 mb-3">
              <span>Inicio</span>
              <span className="mx-2">›</span>
              <span className="text-gray-900 font-semibold">Panel de Administración</span>
            </nav>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-[1.75rem] font-extrabold text-gray-900 tracking-tight">
                  Panel de Administración
                </h1>
                <p className="text-gray-500 text-[0.9rem] mt-1">
                  {products.length} productos en total
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right mr-1 hidden sm:block">
                  <p className="text-[0.8125rem] font-bold text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
                <button
                  id="admin-logout"
                  type="button"
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  className="inline-flex items-center gap-2 py-2.5 px-4 border-[1.5px] border-gray-200 rounded-[10px] text-[0.9rem] font-semibold text-gray-600 bg-white transition-all duration-200 hover:border-red-300 hover:text-red-500"
                >
                  <LogOut size={16} /> Cerrar sesión
                </button>
                <button
                  id="admin-reset"
                  type="button"
                  onClick={resetProducts}
                  className="inline-flex items-center gap-2 py-2.5 px-4 border-[1.5px] border-gray-200 rounded-[10px] text-[0.9rem] font-semibold text-gray-600 bg-white transition-all duration-200 hover:border-brand hover:text-brand"
                >
                  <RotateCcw size={16} /> Restablecer
                </button>
                <button
                  id="admin-add-product"
                  type="button"
                  onClick={openCreate}
                  className="inline-flex items-center gap-2 py-2.5 px-4 bg-brand text-white border-none rounded-[10px] text-[0.9rem] font-bold transition-all duration-200 hover:bg-brand-dark"
                >
                  <Plus size={16} /> Nuevo Producto
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-10 px-6 flex flex-col lg:flex-row gap-8 items-start">
          <AdminSidebar activeSection={activeSection} onSelect={setActiveSection} />

          <div className="flex-1 min-w-0">
          {activeSection === "productos" && (
          <>
          {/* Search */}
          <div className="relative max-w-md mb-6">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-gray-400 pointer-events-none">
              🔍
            </span>
            <input
              id="admin-search"
              type="search"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full py-2.5 pl-10 pr-4 border-[1.5px] border-gray-200 rounded-[10px] text-[0.9rem] outline-none transition-[border-color,box-shadow,background-color] duration-200 bg-white text-gray-900 focus:border-brand focus:shadow-[0_0_0_3px_rgb(5_150_105/0.15)]"
            />
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[0.9rem]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="py-3.5 px-6 font-bold text-gray-900 text-[0.8rem] uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="py-3.5 px-4 font-bold text-gray-900 text-[0.8rem] uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="py-3.5 px-4 font-bold text-gray-900 text-[0.8rem] uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="py-3.5 px-4 font-bold text-gray-900 text-[0.8rem] uppercase tracking-wider">
                      Valoración
                    </th>
                    <th className="py-3.5 px-4 font-bold text-gray-900 text-[0.8rem] uppercase tracking-wider">
                      Etiqueta
                    </th>
                    <th className="py-3.5 px-6 text-right font-bold text-gray-900 text-[0.8rem] uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 last:border-none hover:bg-gray-50/60">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-xl border border-gray-200 flex items-center justify-center shrink-0 bg-gray-50">
                            <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
                          </div>
                          <span className="font-semibold text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold text-gray-600 bg-gray-100">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-900">
                        {formatPrice(product.price)}
                        {product.originalPrice !== undefined && (
                          <span className="block text-xs text-gray-400 line-through font-normal">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        ★ {product.rating.toFixed(1)}{" "}
                        <span className="text-gray-400 text-xs">({product.reviews})</span>
                      </td>
                      <td className="py-4 px-4">
                        {product.badge ? (
                          <span
                            className="inline-flex px-2.5 py-1 rounded-lg text-xs font-bold text-white"
                            style={{ background: product.badgeColor }}
                          >
                            {product.badge}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            id={`admin-view-${product.id}`}
                            type="button"
                            onClick={() => setViewing(product)}
                            aria-label={`Ver ${product.name}`}
                            className="p-2.5 rounded-lg text-gray-500 border-none transition-colors duration-200 hover:text-brand hover:bg-brand-xlight"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            id={`admin-edit-${product.id}`}
                            type="button"
                            onClick={() => openEdit(product)}
                            aria-label={`Editar ${product.name}`}
                            className="p-2.5 rounded-lg text-gray-500 border-none transition-colors duration-200 hover:text-brand hover:bg-brand-xlight"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            id={`admin-delete-${product.id}`}
                            type="button"
                            onClick={() => handleDelete(product)}
                            aria-label={`Eliminar ${product.name}`}
                            className="p-2.5 rounded-lg text-gray-500 border-none transition-colors duration-200 hover:text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-16 text-center text-gray-500">
                        No se encontraron productos para &quot;{search}&quot;
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {filtered.length > 0 && (
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              totalItems={filtered.length}
              pageSize={ADMIN_PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          )}
          </>
          )}

          {activeSection === "categorias" && (
            <CategoryManager />
          )}

          {activeSection === "mensajes" && (
            <ContactMessagesPanel />
          )}
          </div>
        </div>
      </main>

      {modalOpen && (
        <ProductFormModal
          mode={editing ? "edit" : "create"}
          initialProduct={editing}
          onClose={() => {
            setModalOpen(false);
            setEditing(undefined);
          }}
          onSave={handleSave}
        />
      )}

      {viewing && (
        <ProductViewModal
          product={viewing}
          onClose={() => setViewing(undefined)}
          onEdit={(product) => {
            setViewing(undefined);
            openEdit(product);
          }}
        />
      )}

      <footer className="bg-gray-900 text-gray-500 py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 text-[0.8125rem]">
          <p>
            © 2026 NexaMarket · Panel de Administración
          </p>
          <div className="flex gap-6">
            <Link href="/" className="transition-colors duration-200 hover:text-brand-light">
              Volver a la tienda
            </Link>
            <button
              type="button"
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="transition-colors duration-200 hover:text-brand-light"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
