import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Layout from "@/components/Layout";
import utilStyle from "@/styles/utils.module.css"
import { getPostsData } from "@/lib/post";
import Head from "next/head";

// SSGのばあい
export async function getStaticProps() {
  const allPostsData = getPostsData();
  console.log(allPostsData);
  return {
    props: {
      allPostsData
    }
  }
}

/**
 * // SSRの場合
export async function getServerSideProps(context) {
  return {
    props: {
      allPostsData
    }
  }
}
 *
 */

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <section className={utilStyle.headingMd}>
        <p>私は駆け出しのエンジニアです</p>
      </section>

      <section>
        <h2>✍エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`} >
                <img 
                  src={thumbnail} 
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link className={utilStyle.boldText} href="/" >
                {title}
              </Link>
              <br />
              <small className={utilStyle.lightText}>
                {date}
              </small>
            </article>
          ))}
        </div>
      </section>
      
    </Layout>
  );
}
