import SearchPageClient from "./SearchPageClient";

export const instant = false;

type SearchPageProps = {
  params: Promise<{ search: string }>;
};

export default async function SearchPage({ params }: SearchPageProps) {
  const { search } = await params;

  return <SearchPageClient search={search} />;
}
