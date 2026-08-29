import { createFileRoute, notFound } from "@tanstack/react-router";
import { Atmosphere } from "@/components/site/Atmosphere";
import { Cursor } from "@/components/site/Cursor";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Contact";
import { ModelProfile } from "@/components/site/ModelProfile";
import { models } from "@/data/models";
import { getRequestOrigin } from "@/lib/origin.functions";

export const Route = createFileRoute("/models/$id")({
  loader: async ({ params }) => {
    const model = models.find((m) => m.id === params.id);
    if (!model) throw notFound();
    const origin = await getRequestOrigin();
    return { model, origin };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Model not found — Top Model Zimbabwe" }, { name: "robots", content: "noindex" }],
      };
    }
    const { model, origin } = loaderData;
    const title = `${model.name} — ${model.division} division | Top Model Zimbabwe`;
    const desc = `${model.name}, ${model.height}, based in ${model.location}. ${model.specialties.join(", ")} talent represented by Top Model Zimbabwe. Book this model in Harare or worldwide.`;
    const image = `${origin}${model.cover}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "profile" },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: `${origin}/models/${model.id}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: model.name,
            jobTitle: "Model",
            height: model.height,
            image,
            url: `${origin}/models/${model.id}`,
            worksFor: { "@type": "Organization", name: "Top Model Zimbabwe" },
          }),
        },
      ],
    };
  },
  component: ModelPage,
  notFoundComponent: ModelNotFound,
});

function ModelPage() {
  const { model } = Route.useLoaderData();
  return (
    <>
      <Cursor />
      <Atmosphere />
      <Nav />
      <main>
        <ModelProfile model={model} />
      </main>
      <Footer />
    </>
  );
}

function ModelNotFound() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-5 py-40 text-center sm:px-8">
        <h1 className="display text-6xl">Model not found</h1>
        <p className="mt-4 text-muted-foreground">
          This profile is no longer on the board. Browse the full roster instead.
        </p>
        <a href="/models" className="label mt-8 inline-block text-champagne">
          View all models
        </a>
      </main>
      <Footer />
    </>
  );
}
