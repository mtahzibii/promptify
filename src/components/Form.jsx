import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full items-start flex-col ">
      <h1 className="head_text text-left blue_gradient">{type} Post</h1>

      <p className="desc max-w-md text-left">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <div className="px-3 py-4 my-16 font-semibold max-w-lg  glassmorphism">
        <form className="w-full" onSubmit={handleSubmit}>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Your AI Prompt
            </span>

            <textarea
              value={post.prompt}
              type="text"
              id="prompt"
              className="form_textarea"
              onChange={(e) => {
                setPost({ ...post, prompt: e.target.value });
              }}
              required
              placeholder="Write your post here"
            />
          </label>

          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Field of Prompt{" "}
              <span className="font-normal">
                (#product, #webdevelopment, #idea, etc.)
              </span>
            </span>
            <input
              value={post.tag}
              type="text"
              id="tag"
              className="form_input"
              placeholder="#Tag"
              onChange={(e) => setPost({ ...post, tag: e.target.value })}
            />
          </label>

          <div className="flex justify-end items-center gap-4  mt-10">
            <Link href="/" className="text-gray-500 text-sm">
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-1.5 text-sm bg-orange-400 rounded-full text-white">
              {submitting ? `${type}ing...` : type}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
