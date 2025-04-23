import Head from "next/head";
import styles from "./layout.module.css"
const name = "oka";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

function Layout({ children, home, head }) {
    const siteTitle = head ? head : "Next.js blog";
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>{siteTitle}</title>
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <img src="/images/profile.png" className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`} />
                        <h1>{name}</h1>
                    </>
                ) : (
                    <>
                        <img src="/images/profile.png" className={utilStyles.borderCircle} />
                        <h1>{name}</h1>
                    </>
                )}
                
            </header>
            <main>{children}</main>
            {!home && (
                <div>
                    <Link href='/'>← ホームへ戻る</Link>
                </div>
            )}
        </div>
    )
}

export default Layout;