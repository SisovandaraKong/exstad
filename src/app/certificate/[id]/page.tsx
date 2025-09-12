import { getCertificateById, type CertItem } from "@/lib/certificate";
import CertificateImage from "@/components/student/Certificate";

export const dynamic = "force-static";

export default function Page({ params }: { params: { id: string } }) {
  const cert = getCertificateById(params.id);

  if (!cert) {
    return (
      <main className="mx-auto max-w-xl p-8">
        <h1 className="text-2xl font-semibold">Certificate not found</h1>
        <p className="mt-2 text-gray-600">
          No certificate exists for id “{params.id}”.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8 flex flex-col">
      <CertificateImage cert={cert} />
    </main>
  );
}