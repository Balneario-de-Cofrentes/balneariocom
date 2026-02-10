import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/sections/CTA";
import { getAllBlogPosts } from "@/lib/content";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog y Ciencia",
  description:
    "Articulos sobre longevidad, salud termal, investigacion y ciencia en el Balneario de Cofrentes.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      {/* Hero */}
      <section className="bg-navy pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="mb-4 inline-block text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
            Blog y Ciencia
          </span>
          <h1 className="max-w-3xl font-display text-5xl text-white lg:text-6xl">
            Ultimas actualizaciones
          </h1>
          <p className="mt-6 max-w-xl text-lg font-body font-light text-white/60">
            Investigacion, ciencia y novedades del Balneario de Cofrentes.
          </p>
        </div>
      </section>

      <Section bg="cream">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="font-display text-xl text-charcoal group-hover:text-navy-light-dark transition-colors line-clamp-2">
                {post.meta.title}
              </h3>
              {post.meta.description && (
                <p className="mt-3 flex-1 text-sm font-body font-light text-warm-gray line-clamp-3">
                  {post.meta.description}
                </p>
              )}
              <div className="mt-4 flex items-center gap-1.5 text-sm font-body font-medium text-navy-light opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span>Leer mas</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}
