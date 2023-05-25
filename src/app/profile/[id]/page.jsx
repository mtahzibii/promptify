"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = () => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPrompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      console.log(data);

      const filteredPosts = data.filter(
        (post) => post.creator.username === userName
      );
      setUserPosts(filteredPosts);
    };

    fetchUserPrompts();
  }, [userName]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      userPosts={userPosts}
    />
  );
};

export default UserProfile;
