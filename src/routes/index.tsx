import { createFileRoute } from "@tanstack/react-router";
import { Atmosphere } from "@/components/site/Atmosphere";
import { Cursor } from "@/components/site/Cursor";
import { Intro } from "@/components/site/Intro";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Models } from "@/components/site/Models";
import { Editorial } from "@/components/site/Editorial";
import { Creative } from "@/components/site/Creative";
import { About } from "@/components/site/About";
import { Contact, Footer } from "@/components/site/Contact";
import { useAtmosphere } from "@/components/site/useAtmosphere";

const TITLE = "Top Model Zimbabwe — Model Management & Creative Talent";
const DESC =
  "Top Model Zimbabwe is a Harare-based model management house representing women, men and creative talent for fashion, beauty, campaign and film worldwide.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useAtmosphere();

  return (
    <>
      <Intro />
      <Cursor />
      <Atmosphere />
      <Nav />
      <main>
        <Hero />
        <Models />
        <Editorial />
        <Creative />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
