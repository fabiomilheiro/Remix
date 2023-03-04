import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "../../models/post.server";
export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <>
      <h1>Posts</h1>

      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>

      {posts.map((p) => (
        <li key={p.slug}>
          <Link to={`/posts/${p.slug}`} className="text-blue-600 underline">
            {p.title}
          </Link>
        </li>
      ))}
    </>
  );
}

export const loader = async () => {
  return json({
    posts: await getPosts(),
  });
};
