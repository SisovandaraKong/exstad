import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  useGenerateQrMutation,
  useGetQrImageMutation,
} from "../../features/bakong/BakongApi";

export default function Bakong({
  open,
  onClose,
  amount,
}: {
  open: boolean;
  amount: number;
  onClose: () => void;
}) {
  const [generateQr, { isLoading: qrLoading, error: qrError }] =
    useGenerateQrMutation();
  const [getQrImage] = useGetQrImageMutation();
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const bakongDataRequest = {
    amount: amount,
  };

  useEffect(() => {
    const fetchQr = async () => {
      if (open) {
        setLoading(true);
        setLocalError(null);
        setQrImageUrl(null);
        try {
          
          const result = await generateQr(bakongDataRequest).unwrap();
          console.log("QR Generation Result:", result);
          if (result?.data?.qr && result?.data?.md5) {
            
            const imageBlob = await getQrImage({
              qr: result.data.qr,
              md5: result.data.md5,
            }).unwrap();
            setQrImageUrl(URL.createObjectURL(imageBlob));
          } else {
            setLocalError("Failed to generate QR code.");
          }
        } catch (err) {
          console.error("Error generating QR code:", err);
          setLocalError("Failed to generate QR code.");
        }
        setLoading(false);
      }
    };
    fetchQr();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg p-8 relative min-w-[320px]">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">Scan QR to Pay</h2>
        {(qrLoading || loading) && <div>Generating QR code...</div>}
        {(qrError || localError) && (
          <div className="text-red-500">Failed to generate QR code.</div>
        )}
        {qrImageUrl && (
          <div className="flex flex-col items-center">
            <Image
              src={qrImageUrl}
              alt="QR Code"
              width={256}
              height={256}
              className="w-64 h-64"
            />
            <div className="mt-2 text-sm text-gray-600">
              Scan with Bakong/Bank App
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
