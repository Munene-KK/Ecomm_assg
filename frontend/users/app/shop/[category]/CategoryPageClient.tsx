"use client";

import { Suspense, useEffect, useMemo } from "react";
import ProductDetails from "@/Components/ProductDetails";
import CategoriesNav from "@/Components/Categories";
import { useProducts } from "../../../Context/ProductContext";

export default function CategoryPageClient({
  category,
}: {
  category: string;
}) {
  useEffect(() => {
    if (!category) {
      return;
    }
    document.title = `${category}s | Infinyte`;
  }, [category]);

  const { products } = useProducts();
  const relproduct = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLocaleLowerCase().includes(category.toLocaleLowerCase()),
      ),
    [products, category],
  );

  return (
    <Suspense fallback={<p>No results</p>}>
      <section className="home-page">
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
