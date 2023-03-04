import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createPost } from "~/models/post.server";

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const post = {
    title: formData.get("title")?.toString() ?? "",
    slug: formData.get("slug")?.toString() ?? "",
    markdown: formData.get("markdown")?.toString() ?? "",
  };

  const errors = {
    title: post.title ? null : "Title is required",
    slug: post.slug ? null : "Slug is required",
    markdown: post.markdown ? null : "Markdown is required",
  };

  if (Object.values(errors).some((e) => e)) {
    return json(errors);
  }

  await createPost(post);

  return redirect("/posts/admin");
};

export default function NewPost() {
  const errors = useActionData<typeof action>();

  return (
    <Form method="post">
      <p>
        <label>
          Post Title:{" "}
          <input type="text" name="title" className={inputClassName} />
          {errors?.title && <em className="text-red-600">{errors.title}</em>}
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          <input type="text" name="slug" className={inputClassName} />
          {errors?.slug && <em className="text-red-600">{errors.slug}</em>}
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>
        <br />
        <textarea
          id="markdown"
          rows={20}
          name="markdown"
          className={`${inputClassName} font-mono`}
        />
        {errors?.markdown && (
          <em className="text-red-600">{errors.markdown}</em>
        )}
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Create Post
        </button>
      </p>
    </Form>
  );
}
