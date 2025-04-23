import Layout from "@/components/Layout";
import { getAllPostsId, getPostData } from "@/lib/post";
import utilityStyles from "@/styles/utils.module.css"

export async function  getStaticPaths() {
    const paths = await getAllPostsId();

    return{
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData( params.id );

    return{
        props: {
            postData
        }
    }
}

export default function Post({ postData }) {
    return (
        <Layout head={postData.title}>
            <article>
                <h1 className={utilityStyles.headingXl}>{postData.title}</h1>
                <div className={utilityStyles.lightText}>{postData.date}</div>
                <div dangerouslySetInnerHTML={{__html: postData.blogContentHtml}} />
            </article>
        </Layout>
    )
}