import React from 'react';
import { useLoading } from '@/context/OverlayContext'; // Adjust path accordingly

export default function LoadingOverlay () {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000bb]">
      <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#91ABFF] rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  );
};
