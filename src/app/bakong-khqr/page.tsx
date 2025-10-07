"use client";
import React, { useState } from "react";
import Bakong from "../../components/bakong/Bakong";


export default function BakongKH() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setOpen(true)}
      >
        Show Bakong QR
      </button>
      <Bakong open={open} amount={0.01} onClose={() => setOpen(false)} />
    </div>
  );
}