import React from "react";
import { useLoading } from "@/context/OverlayContext"; // Adjust path accordingly

export default function LoadingOverlay() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    // <div className="fixed inset-0 flex items-center justify-center bg-[#00000066]">
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center space-y-4 z-50">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-[#91ABFF] rounded-full animate-spin"></div>
      <p className="text-lg font-semibold text-gray-700">Loading...</p>
    </div>
    // </div>
  );
}
