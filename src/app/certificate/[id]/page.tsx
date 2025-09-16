<<<<<<< HEAD
import { getCertificateById } from "@/lib/certificate";
=======
import { getCertificateById, type CertItem } from "@/lib/certificate";
>>>>>>> d963efa1ba02df92b9821b046e221372851208bd
import CertificateImage from "@/components/student/Certificate";

export const dynamic = "force-static";

export default async function Page({
  params,
}: {
<<<<<<< HEAD
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
=======
  params: Promise<{ id: string }>; 
  
})  {
  const id = (await params).id
>>>>>>> d963efa1ba02df92b9821b046e221372851208bd
  const cert = getCertificateById(id);

  if (!cert) {
    return (
      <main className="mx-auto max-w-xl p-8">
        <h1 className="text-2xl font-semibold">Certificate not found</h1>
        <p className="mt-2 text-gray-600">
          No certificate exists for id “{id}”.
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
