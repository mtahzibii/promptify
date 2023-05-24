import PromptCard from "./PromptCard";

const Profile = ({ name, desc, userPosts, handleDelete }) => {
  return (
    <section className="flex flex-col justify-center items-start w-full p-6 mt-12">
      <h1 className="text-5xl font-bold  text-blue-500 sm:text-6xl leading-[1.5]">
        {name} Profile
      </h1>
      <p className="desc">{desc}</p>

      <div className="mt-10 prompt_layout">
        {userPosts.map((userPost, index) => (
          <PromptCard
            key={index}
            post={userPost}
            handleDelete={() => handleDelete && handleDelete(userPost)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
