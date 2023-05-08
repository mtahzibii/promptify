import Feed from "@components/Feed";

export default function Home() {
  return (
    <main>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Discove and Share
          <br className="max-md:hidden" />
          <h1 className="mt-4 orange_gradient text-center">
            AI-Powered Prompts
          </h1>
        </h1>
        <p className="desc text-center">
          Promptopia is an open-source AI prompting toll for modern world to
          discover, create and share creative propmts{" "}
        </p>

        <Feed />
      </section>
    </main>
  );
}
