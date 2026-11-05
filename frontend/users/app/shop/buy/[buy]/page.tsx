import BuyPageClient from "./BuyPageClient";

export const instant = false;

type BuyPageProps = {
  params: Promise<{ buy: string }>;
};

export default async function BuyPage({ params }: BuyPageProps) {
  const { buy } = await params;

  return <BuyPageClient buy={buy} />;
}
