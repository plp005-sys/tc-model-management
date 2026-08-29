import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Atmosphere } from "@/components/site/Atmosphere";
import { Cursor } from "@/components/site/Cursor";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Contact";
import { DivisionFilter, ModelGrid } from "@/components/site/Models";
import { models, type Division } from "@/data/models";

const TITLE = "The Board — Models & Creative Talent | Top Model Zimbabwe";
const DESC =
  "Browse the full Top Model Zimbabwe board: women, men and creative talent available for fashion, beauty, campaign, runway and film bookings in Harare and worldwide.";

export const Route = createFileRoute("/models/")({
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
  component: ModelsIndex,
});

function ModelsIndex() {
  const [filter, setFilter] = useState<Division | "all">("all");
  const list = useMemo(
    () => (filter === "all" ? models : models.filter((m) => m.division === filter)),
    [filter],
  );

  return (
    <>
      <Cursor />
      <Atmosphere />
      <Nav />
      <main className="px-5 pb-32 pt-32 sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label text-champagne">The Board</p>
              <h1 className="display mt-4 text-[16vw] leading-[0.82] sm:text-[10vw] lg:text-[7.5vw]">
                Models &<span className="block italic">creative talent</span>
              </h1>
            </div>
            <DivisionFilter filter={filter} onChange={setFilter} />
          </div>

          <div className="mt-20">
            <ModelGrid list={list} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
