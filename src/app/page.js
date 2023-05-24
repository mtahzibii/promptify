import Feed from "@components/Feed";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col justify-center items-center">
        <h1 className="head_text text-center">
          Discover and Share
          <br className="max-md:hidden" />
          <p className="mt-4 orange_gradient text-center">AI-Powered Prompts</p>
        </h1>
        <p className="desc text-center">
          Promptopia is an open-source AI prompting toll for modern world to
          discover, create and share creative propmts{" "}
        </p>
      </section>
      <Feed />
    </main>
  );
}
