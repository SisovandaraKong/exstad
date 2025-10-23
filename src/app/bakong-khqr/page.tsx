"use client";
import React, { useState, useEffect } from "react";
import Bakong from "../../components/bakong/Bakong";
import { useGetScholarByUsernameQuery } from "@/features/scholar/scholarApi";
import { LoadingOverlay } from "@/components/loading/LoadingOverlay";

export default function BakongKH() {
  const [open, setOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  // Fetch and log scholar by username
  const {
    data: scholar,
    isLoading,
    isFetching,
    error,
  } = useGetScholarByUsernameQuery("kikosbbazz");

  // Auto show overlay while query loads
  useEffect(() => {
    setShowOverlay(isLoading || isFetching);
  }, [isLoading, isFetching]);

  useEffect(() => {
    if (isLoading || isFetching) return;
    console.log("useGetScholarByUsernameQuery:", { data: scholar, error });
  }, [scholar, error, isLoading, isFetching]);

  const testOverlay = () => {
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 150000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      {showOverlay && <LoadingOverlay />}

      <button
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setOpen(true)}
      >
        Show Bakong QR
      </button>

      <button
        className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700"
        onClick={testOverlay}
      >
        Test Loading Overlay
      </button>

      <Bakong
        open={open}
        amount={0.01}
        openingProgramUuid="bf06361a-5776-408d-80e5-9c358737771e"
        enrollmentUuid="d0936dac-0d53-4b59-a55d-3df41f6259dc"
      />
    </div>
  );
}
