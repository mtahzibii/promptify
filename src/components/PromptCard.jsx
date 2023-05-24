"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleDelete }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {};

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => {
      setCopied("");
    }, 600);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start">
        <div
          className="flex justify-center items-center gap-2 cursor-pointer"
          onClick={handleProfileClick}>
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-800">
              {post.creator.username}
            </h3>
            <p className="text-sm text-gray-500">{post.creator.email}</p>
          </div>
        </div>
        <div className="copy_btn">
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy-link"
            width={12}
            height={12}
            className="cursor-pointer"
            onClick={handleCopy}
          />
        </div>
      </div>
      <p>{post.prompt}</p>
      <p
        className="blue_gradient text-sm cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}>
        {`${post.tag},`}
      </p>
      {session?.user.id === post.creator._id && pathname === "/profile" && (
        <div className="flex justify-between items-center gap-4 mt-8 py-2">
          <Link
            href={`/update-prompt?id=${post._id}`}
            className="text-green-500 text-sm cursor-pointer">
            Edit
          </Link>
          <p
            className="text-orange-700 text-sm cursor-pointer"
            onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
