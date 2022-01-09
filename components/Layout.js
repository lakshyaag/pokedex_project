import Head from "next/head";

const Layout = ({ title, children }) => (
  <div className="bg-slate-300">
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="A simple Pokedex, created using Next.js and TailwindCSS"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="container mx-auto max-w-xl min-h-screen pt-8">
      {children}
    </main>
  </div>
);

export default Layout;
