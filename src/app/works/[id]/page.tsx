import { unstable_ViewTransition as ViewTransition } from "react";
import { Metadata } from "next";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { getDetail, data } from "@/lib/data-service";
import styles from "./page.module.css";

// 静的パラメータを生成
export async function generateStaticParams() {
  return data.map((item) => ({
    id: item.id,
  }));
}

// 動的メタデータを生成
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const itemData = getDetail(resolvedParams.id);

  if (!itemData) {
    return {
      title: "Work Not Found - ClockMaker Labs",
      description: "The requested work could not be found.",
    };
  }

  return {
    title: `${itemData.title} - ClockMaker Labs`,
    description: `${itemData.date} - This work is build with ${itemData.technology.join(", ")}.`,
    openGraph: {
      title: `${itemData.title} - ClockMaker Labs`,
      description: `${itemData.date} - This work is build with ${itemData.technology.join(", ")}.`,
      url: `https://clockmaker.jp/labs/works/${itemData.id}`,
      siteName: "clockmaker.jp",
      images: [
        {
          url: itemData.img,
          width: 460,
          height: 200,
          alt: `${itemData.title} Preview`,
        },
      ],
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${itemData.title} - ClockMaker Labs`,
      description: `${itemData.date} - This work is build with ${itemData.technology.join(", ")}.`,
      site: "@clockmaker",
      images: [itemData.img],
    },
  };
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const itemData = getDetail(resolvedParams.id);

  if (!itemData) {
    return (
      <div className={styles.detailPageGrid}>
        <header className={styles.header}>
          <Header title="Not Found" showNavigation={false} />
        </header>
        <main className={styles.main}>
          <div className={styles.errorContainer}>
            <h2>Work not found</h2>
            <p>The requested work could not be found.</p>
          </div>
        </main>
      </div>
    );
  }

  const meta = `${itemData.date} - This work is build with ${itemData.technology.join(", ")}.`;

  return (
    <div className={styles.detailPageGrid}>
      <header className={styles.header}>
        <Header
          title={itemData.title}
          showNavigation={true}
          itemData={itemData}
        />
      </header>

      <main className={styles.main}>
        <ViewTransition name={`work-item-${itemData.id}`}>
          <div className={styles.iframeContainer}>
            <iframe
              src={itemData.demo}
              title={itemData.title}
              className={styles.demoIframe}
              allowFullScreen
            />
          </div>
        </ViewTransition>
      </main>

      <footer className={styles.footer}>
        <Footer meta={meta} />
      </footer>
    </div>
  );
}
