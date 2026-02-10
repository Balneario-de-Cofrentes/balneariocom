import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllBlogPosts, getBlogPost } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/sections/CTA";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = getAllBlogPosts();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getBlogPost(slug);
  if (!item) return {};
  return {
    title: item.meta.title,
    description: item.meta.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const item = getBlogPost(slug);
  if (!item) notFound();

  return (
    <>
      <section className="bg-navy pb-16 pt-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Button
            href="/blog"
            variant="ghost"
            size="sm"
            className="mb-8 text-white/50 hover:text-white"
          >
            <ArrowLeft size={14} />
            Blog
          </Button>
          <span className="mb-3 inline-block text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
            Articulo
          </span>
          <h1 className="max-w-3xl font-display text-4xl text-white lg:text-5xl">
            {item.meta.title}
          </h1>
          {item.meta.description && (
            <p className="mt-6 max-w-xl text-lg font-body font-light text-white/60">
              {item.meta.description}
            </p>
          )}
        </div>
      </section>

      <Section bg="cream" narrow>
        <article
          className="prose prose-lg max-w-none font-body
            prose-headings:font-display prose-headings:font-normal prose-headings:text-charcoal
            prose-h2:text-3xl prose-h3:text-xl prose-h3:text-navy-light-dark
            prose-p:text-base prose-p:font-light prose-p:leading-[1.8] prose-p:text-warm-gray
            prose-strong:text-charcoal prose-strong:font-medium
            prose-a:text-navy-light prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(item.content) }}
        />

        <div className="mt-12">
          <Button href="/blog" variant="outline">
            Volver al blog
          </Button>
        </div>
      </Section>

      <CTA />
    </>
  );
}
