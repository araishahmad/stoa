import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight, LuFileText } from "react-icons/lu";
import type { AdminPost } from "./types";
import styles from "./admin.module.css";

export function AdminStoryTable({ posts }: { posts: AdminPost[] }) {
  return (
    <div className={styles.tableWrap} role="region" aria-label="Story table; scroll horizontally on smaller screens" tabIndex={0}>
      <table className={styles.table}>
        <caption className="sr-only">Sample stories and editorial status</caption>
        <thead><tr><th scope="col">Story</th><th scope="col">Status</th><th scope="col">Sample date</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
        <tbody>
          {posts.map((post) => {
            const editorHref = post.isNew ? "/admin/posts/new" : `/admin/posts/${post.slug}`;
            return (
              <tr key={post.id}>
                <td>
                  <div className={styles.storyCell}>
                    {post.image ? <Image className={styles.storyImage} src={post.image} alt="" width={51} height={48} sizes="51px" /> : <LuFileText className={styles.storyImage} aria-hidden="true" />}
                    <div><Link href={editorHref}>{post.title}</Link><small>{post.category}</small></div>
                  </div>
                </td>
                <td><span className={styles.status} data-status={post.status}>{post.status}</span></td>
                <td><span className="muted">{post.dateLabel}</span></td>
                <td><Link href={editorHref} className={styles.rowLink} aria-label={`Edit ${post.title}`}>Edit <LuArrowUpRight aria-hidden="true" /></Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
