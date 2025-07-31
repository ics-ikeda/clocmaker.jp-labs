import { getDetail } from '../../../lib/data-service';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import styles from './page.module.css';

// 静的パラメータを生成
export async function generateStaticParams() {
  const { data } = await import('../../../lib/data-service');
  return data.map((item) => ({
    id: item.id,
  }));
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function DetailPage({ params }: PageProps) {
  const itemData = getDetail(params.id);

  if (!itemData) {
    return (
      <div className={styles.detailPageGrid}>
        <header className={styles.header}>
          <Header
            title="Not Found"
            showNavigation={false}
          />
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

  const meta = `${itemData.date} - This work is build with ${itemData.technology.join(', ')}.`;

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
        <div className={styles.iframeContainer}>
          <iframe
            src={itemData.demo}
            title={itemData.title}
            className={styles.demoIframe}
            allowFullScreen
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <Footer meta={meta} />
      </footer>
    </div>
  );
}
