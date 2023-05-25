"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchMyPrompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      const filteredPosts = data.filter(
        (post) => post.creator._id === session?.user.id
      );
      if (session?.user.id) setUserPosts(filteredPosts);
    };

    fetchMyPrompts();
  }, [session?.user.id]);

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });

        const filteredPosts = userPosts.filter((item) => item._id !== post._id);
        setUserPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      userPosts={userPosts}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
