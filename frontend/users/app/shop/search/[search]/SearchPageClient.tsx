"use client";

import { Suspense, useEffect } from "react";
import ProductDetails from "@/Components/ProductDetails";
import CategoriesNav from "@/Components/Categories";
import { useProducts } from "@/Context/ProductContext";

export default function SearchPageClient({ search }: { search: string }) {
  const { products } = useProducts();

  useEffect(() => {
    document.title = `${search}s | Infinyte`;
  }, [search]);

  const relproduct = products.filter(
    (product) =>
      product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      product.description
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()) ||
      product.category.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );

  return (
    <Suspense>
      <section className="home-page">
        <p className="found-search">Search results for: {search}</p>
        <CategoriesNav />
        {relproduct.length === 0 ? (
          <p className="loading"></p>
        ) : (
          <section className="categorys">
            <article className="category">
              {relproduct.map((product) => (
                <ProductDetails key={product._id} product={product} />
              ))}
            </article>
          </section>
        )}
      </section>
    </Suspense>
  );
}
