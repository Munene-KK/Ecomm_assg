import CategoryPageClient from "./CategoryPageClient";

export const instant = false;

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  return <CategoryPageClient category={category} />;
}
