import Link from "next/link";
import "../css/static.css";
import { usePathname } from "next/navigation";
const CategoriesNav = () => {
  interface Category {
    label: string;
    keyWord: string;
  }
  const categories: Category[] = [
    { label: "Smart Phones", keyWord: "phone" },
    { label: "Laptops", keyWord: "laptop" },
    { label: "TVs", keyWord: "tv" },
    { label: "Monitors", keyWord: "monitor" },
    { label: "Tablets", keyWord: "tablet" },
  ];
  const pathname = usePathname();

  return (
    <section className="category-section" aria-label="Product categories">
      <h2>Categories</h2>
      <nav className="category-nav">
        <Link href={"/"} className={pathname === "/" ? "active" : "link"}>
          All
        </Link>
        {categories.map((heading) => {
          const href = `/shop/${heading.keyWord}`;
          const isActive = pathname === href;
          return (
            <Link
              key={heading.keyWord}
              href={href}
              className={isActive ? "active" : "link"}
            >
              {heading.label}
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default CategoriesNav;
