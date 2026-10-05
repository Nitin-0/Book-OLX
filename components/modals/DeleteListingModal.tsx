"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { Trash2 } from "lucide-react";

export function DeleteListingModal() {
  const { deleteModalId, closeDeleteModal, deleteListing, getBook } = useApp();

  if (!deleteModalId) return null;
  const book = getBook(deleteModalId);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 modal-bg" onClick={closeDeleteModal} />
      <div className="relative bg-white rounded-3xl p-6 w-full max-w-sm pop-in text-center shadow-2xl">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-500">
          <Trash2 className="w-8 h-8" />
        </div>
        <h3 className="font-display font-black text-xl mt-4">Delete this listing?</h3>
        <p className="text-sm text-ink/50 font-medium mt-1">
          &ldquo;<span className="font-bold text-ink">{book?.title || "This book"}</span>&rdquo; will
          be removed permanently.
        </p>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            onClick={closeDeleteModal}
            className="border-2 border-ink/15 font-extrabold py-3 rounded-2xl text-sm hover:border-ink transition cursor-pointer"
          >
            Keep it
          </button>
          <button
            onClick={() => deleteListing(deleteModalId)}
            className="bg-red-500 text-white font-extrabold py-3 rounded-2xl text-sm hover:bg-red-600 transition cursor-pointer shadow-md"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}
