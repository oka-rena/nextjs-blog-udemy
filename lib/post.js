import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

// mdファイルを取り出す
export function getPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, ""); // ファイル名（id）

        // マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf-8");

        const matterResult = matter(fileContents);

        // idとデータを返す
        return{
            id, 
            ...matterResult.data
        }
    })
    return allPostsData;
}

// getstaticPathのreturnで返すパスを作る
export function getAllPostsId() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, "")
            }
        }
    })
}

// idに基づいて、ブログ投稿データを返す
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf-8");
    
    const matterResult = matter(fileContent);

    const blogContent = await remark()
                        .use(html)
                        .process(matterResult.content);

    const blogContentHtml = blogContent.toString();

    return {
        id,
        blogContentHtml,
        ...matterResult.data,
    }
}