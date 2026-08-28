"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import { data, formatStartDateForGroup } from "@/lib/data-service";
import {
  playClickSound,
  playNavigationMouseOverSound,
} from "@/lib/sound-service";
import type { ItemData } from "@/types/item-data";
import AboutDialog, {
  ABOUT_DIALOG_TRIGGER_COMMAND,
} from "../components/AboutDialog";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TextShuffle from "../components/TextShuffle";
import WorkItem from "../components/WorkItem";
import styles from "./page.module.css";

interface TechnologyGroup {
  label: string;
  options: readonly string[];
}

const technologyGroups: readonly TechnologyGroup[] = [
  {
    label: "Graphics APIs",
    options: ["WebGPU", "WebGL", "Canvas"],
  },
  {
    label: "JavaScript",
    options: ["Three.js", "PixiJS", "CreateJS", "AwayJS", "GSAP", "Angular 2"],
  },
  {
    label: "Web platform",
    options: ["HTML", "CSS", "WebAssembly", "Web Worker"],
  },
  {
    label: "Physics",
    options: ["Rapier.js", "Box2D"],
  },
  {
    label: "Flash / ActionScript",
    options: [
      "Flash",
      "Stage3D",
      "Adobe Animate CC",
      "Away3D",
      "Papervision3D",
      "Starling",
      "BetweenAS3",
      "Progression",
      "SiON",
    ],
  },
];

const typeOptions = Array.from(
  new Set(data.flat().map((item) => item.type)),
).toSorted((a, b) => a.localeCompare(b, "en"));
const technologyValues = new Set(
  technologyGroups.flatMap((group) => group.options),
);
const typeValues = new Set(typeOptions);
const HOME_INTRO_DURATION = 1800;
let hasPlayedHomeIntro = false;

interface WorkFilters {
  technology: string;
  type: string;
}

const matchesFilters = (item: ItemData, filters: WorkFilters): boolean => {
  if (filters.technology && !item.technology.includes(filters.technology)) {
    return false;
  }

  if (filters.type && item.type !== filters.type) {
    return false;
  }

  return true;
};

const getFilteredWorks = (filters: WorkFilters): ItemData[] =>
  data.flatMap((itemArray) => {
    const matchedItem = itemArray.find((item) => matchesFilters(item, filters));

    if (!matchedItem) {
      return [];
    }

    return [
      {
        ...matchedItem,
        date: formatStartDateForGroup(itemArray),
      },
    ];
  });

interface HomeProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const getStringParam = (
  value: string | string[] | undefined,
): string | undefined => (typeof value === "string" ? value : undefined);

export default function Home({ searchParams }: HomeProps) {
  const router = useRouter();
  const filterDockRef = useRef<HTMLDetailsElement>(null);
  const [shouldPlayIntro, setShouldPlayIntro] = useState(
    () => !hasPlayedHomeIntro,
  );
  const params = use(searchParams);
  const technologyParam = getStringParam(params.tech);
  const typeParam = getStringParam(params.type);
  const technology =
    technologyParam && technologyValues.has(technologyParam)
      ? technologyParam
      : "";
  const type = typeParam && typeValues.has(typeParam) ? typeParam : "";
  const filteredWorks = getFilteredWorks({
    technology,
    type,
  });
  const hasActiveFilters = technology.length > 0 || type.length > 0;

  useEffect(() => {
    hasPlayedHomeIntro = true;

    if (!shouldPlayIntro) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setShouldPlayIntro(false);
    }, HOME_INTRO_DURATION);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [shouldPlayIntro]);

  const updateFilters = (nextFilters: WorkFilters) => {
    setShouldPlayIntro(false);
    const nextParams = new URLSearchParams();
    if (nextFilters.technology) {
      nextParams.set("tech", nextFilters.technology);
    }
    if (nextFilters.type) {
      nextParams.set("type", nextFilters.type);
    }

    const query = nextParams.toString();
    const href = (query ? `/?${query}` : "/") as Route;
    router.replace(href, { scroll: false });
  };

  const resetFilters = () => {
    if (filterDockRef.current) {
      filterDockRef.current.open = false;
    }
    updateFilters({ technology: "", type: "" });
  };

  return (
    <div className={styles.pageGrid}>
      <header className={styles.header}>
        <Header
          animateTitle={shouldPlayIntro}
          actions={
            <>
              <button
                type="button"
                className={styles.aboutToggle}
                onMouseEnter={playNavigationMouseOverSound}
                onClick={playClickSound}
                {...ABOUT_DIALOG_TRIGGER_COMMAND}
              >
                <span>About</span>
              </button>

              <details ref={filterDockRef} className={styles.filterDock}>
                <summary
                  className={styles.filterToggle}
                  onMouseEnter={playNavigationMouseOverSound}
                  onClick={playClickSound}
                >
                  <i className="fa fa-filter" />
                  <span className={styles.filterToggleLabel}>Filter</span>
                </summary>

                <div className={styles.filterMenu}>
                  <label className={styles.filterField}>
                    <span className={styles.filterLabel}>Technology</span>
                    <span className={styles.filterSelectWrap}>
                      <select
                        className={styles.filterSelect}
                        value={technology}
                        onChange={(event) =>
                          updateFilters({
                            technology: event.target.value,
                            type,
                          })
                        }
                      >
                        <option value="">All</option>
                        {technologyGroups.map((group) => (
                          <optgroup key={group.label} label={group.label}>
                            {group.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <i className="fa fa-chevron-down" />
                    </span>
                  </label>

                  <label className={styles.filterField}>
                    <span className={styles.filterLabel}>Type</span>
                    <span className={styles.filterSelectWrap}>
                      <select
                        className={styles.filterSelect}
                        value={type}
                        onChange={(event) =>
                          updateFilters({
                            technology,
                            type: event.target.value,
                          })
                        }
                      >
                        <option value="">All</option>
                        {typeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <i className="fa fa-chevron-down" />
                    </span>
                  </label>

                  <button
                    type="button"
                    className={styles.filterReset}
                    onClick={resetFilters}
                    disabled={!hasActiveFilters}
                  >
                    Reset filters
                  </button>
                </div>
              </details>
            </>
          }
        />
      </header>

      <AboutDialog />

      <main className={styles.main}>
        <div className={styles.pageTopHero}>
          <h2 className={styles.subTitle}>
            <strong>
              {shouldPlayIntro ? (
                <TextShuffle delay={240} duration={960}>
                  Interaction Design × Web Technology
                </TextShuffle>
              ) : (
                "Interaction Design × Web Technology"
              )}
            </strong>
            <br />
            <small>
              {shouldPlayIntro ? (
                <TextShuffle delay={480} duration={780}>
                  https://labs.clockmaker.jp/
                </TextShuffle>
              ) : (
                "https://labs.clockmaker.jp/"
              )}
            </small>
          </h2>
        </div>
        <div className={styles.pageTopHeroArea}>
          {filteredWorks.length > 0 ? (
            <div className={styles.pageTopHeroAreaRow}>
              {filteredWorks.map((work, index) => (
                <WorkItem
                  key={work.id}
                  data={work}
                  introOrder={index}
                  playIntro={shouldPlayIntro}
                />
              ))}
            </div>
          ) : (
            <div className={styles.filterEmpty} role="status">
              <p>No works match these filters.</p>
              <button type="button" onClick={resetFilters}>
                Reset filters
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <Footer meta="This website is build with Next.js." />
      </footer>
    </div>
  );
}
