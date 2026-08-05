"use client";
import { useState } from "react";
import { Check, Pencil, Plus, RotateCcw, Trash2, X } from "lucide-react";
import { useCategories } from "@/context/CategoriesContext";

export default function CategoryManager() {
  const { categories, addCategory, renameCategory, deleteCategory, resetCategories } =
    useCategories();
  const [newName, setNewName] = useState("");
  const [editingName, setEditingName] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [error, setError] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = addCategory(newName);
    if (!ok) {
      setError("Nombre vacío o categoría ya existente");
      return;
    }
    setError("");
    setNewName("");
  };

  const handleRename = (oldName: string) => {
    const ok = renameCategory(oldName, editValue);
    if (!ok) {
      setError("El nombre no puede quedar vacío");
      return;
    }
    setError("");
    setEditingName(null);
    setEditValue("");
  };

  const handleDelete = (name: string) => {
    if (window.confirm(`¿Eliminar la categoría "${name}"?`)) {
      deleteCategory(name);
    }
  };

  const inputClass =
    "w-full py-2.5 px-3.5 border-[1.5px] rounded-xl text-[0.9rem] text-gray-900 bg-white outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-gray-400 focus:border-brand focus:shadow-[0_0_0_3px_rgb(5_150_105/0.15)] border-gray-200";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
        <div>
          <h2 className="font-extrabold text-gray-900 text-lg">Categorías</h2>
          <p className="text-gray-500 text-sm mt-0.5">
            {categories.length} categorías para los productos
          </p>
        </div>
        <button
          id="admin-reset-categories"
          type="button"
          onClick={resetCategories}
          className="inline-flex items-center gap-2 py-2 px-3.5 border-[1.5px] border-gray-200 rounded-[10px] text-[0.85rem] font-semibold text-gray-600 bg-white transition-all duration-200 hover:border-brand hover:text-brand"
        >
          <RotateCcw size={14} /> Restablecer
        </button>
      </div>

      <div className="px-6 py-5">
        {error && (
          <p className="text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4">
            {error}
          </p>
        )}

        {/* Add form */}
        <form id="admin-add-category" onSubmit={handleAdd} className="flex gap-3 mb-6">
          <input
            id="admin-category-name"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nombre de la nueva categoría..."
            className={inputClass}
          />
          <button
            id="admin-category-add"
            type="submit"
            className="inline-flex items-center gap-2 py-2.5 px-5 bg-brand text-white border-none rounded-xl text-[0.9rem] font-bold transition-all duration-200 whitespace-nowrap hover:bg-brand-dark"
          >
            <Plus size={16} /> Agregar
          </button>
        </form>

        {/* List */}
        <div className="flex flex-col gap-2">
          {categories.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-6">
              No hay categorías. Agrega la primera arriba.
            </p>
          )}
          {categories.map((cat) => (
            <div
              key={cat}
              className="flex items-center justify-between gap-3 py-2.5 px-4 rounded-xl border border-gray-100 hover:border-brand-light transition-colors"
            >
              {editingName === cat ? (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    id={`admin-category-edit-input-${cat}`}
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className={inputClass}
                    autoFocus
                  />
                  <button
                    id={`admin-category-edit-save-${cat}`}
                    type="button"
                    onClick={() => handleRename(cat)}
                    aria-label="Guardar"
                    className="p-2.5 rounded-lg text-brand border-none transition-colors duration-200 hover:bg-brand-xlight"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    id={`admin-category-edit-cancel-${cat}`}
                    type="button"
                    onClick={() => {
                      setEditingName(null);
                      setEditValue("");
                    }}
                    aria-label="Cancelar"
                    className="p-2.5 rounded-lg text-gray-400 border-none transition-colors duration-200 hover:bg-gray-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <span className="font-semibold text-gray-900">{cat}</span>
                  <div className="flex items-center gap-1">
                    <button
                      id={`admin-category-edit-${cat}`}
                      type="button"
                      onClick={() => {
                        setEditingName(cat);
                        setEditValue(cat);
                      }}
                      aria-label={`Renombrar ${cat}`}
                      className="p-2.5 rounded-lg text-gray-500 border-none transition-colors duration-200 hover:text-brand hover:bg-brand-xlight"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      id={`admin-category-delete-${cat}`}
                      type="button"
                      onClick={() => handleDelete(cat)}
                      aria-label={`Eliminar ${cat}`}
                      className="p-2.5 rounded-lg text-gray-500 border-none transition-colors duration-200 hover:text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
