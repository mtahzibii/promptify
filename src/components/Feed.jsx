"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setAllPosts(data);
    };

    fetchPrompts();
  }, []);

  const handleSearchChange = async (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce
    setSearchTimeout(
      setTimeout(() => {
        const results = allPosts.filter(
          (post) =>
            post.prompt.includes(searchText) ||
            post.tag.includes(searchText) ||
            post.creator.username.includes(searchText)
        );
        setSearchedResults(results);
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const results = allPosts.filter(
      (post) =>
        post.prompt.includes(tag) ||
        post.tag.includes(tag) ||
        post.creator.username.includes(tag)
    );
    setSearchedResults(results);
  };

  return (
    <section className="feed">
      <input
        type="text"
        className="rounded-md py-3 px-4 mb-8 w-full text-sm text-gray-400 border-none"
        placeholder="Search for a tag or username"
        value={searchText}
        onChange={handleSearchChange}
      />
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
