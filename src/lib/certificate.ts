import certificatesData from "@/data/Certificate.json";

export type CertItem = {
  id: string;
  imgSrc: string;
  alt: string;
  downloadHref?: string;
};

export const certificates: CertItem[] = (certificatesData as any[]).map((c) => ({
  id: String(c.id),
  imgSrc: c.logo ?? c.imgSrc ?? "",
  alt: c.title ?? "",
  downloadHref: c.downloadHref ?? undefined,
}));

export function getCertificateById(id: string | number): CertItem | undefined {
  const idStr = String(id);
  return certificates.find((c) => String(c.id) === idStr);
}