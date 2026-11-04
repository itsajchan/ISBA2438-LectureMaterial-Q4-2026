import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPhone, phones } from "@/data/phones";
import ProductDetail from "@/components/ProductDetail";

export function generateStaticParams() {
  return phones.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const phone = getPhone(id);
  if (!phone) return { title: "Phone not found — PhoneMart" };
  return {
    title: `${phone.brand} ${phone.name} — PhoneMart`,
    description: `${phone.name}: ${phone.storage}GB storage, ${phone.ram}GB RAM, ${phone.camera} camera. $${phone.price} at PhoneMart.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const phone = getPhone(id);
  if (!phone) notFound();
  return <ProductDetail phone={phone} />;
}
