import Head from "next/head";

const Layout = ({ title, children }) => (
  <div className="bg-purple-900">
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="A simple Pokedex, created using Next.js and TailwindCSS"
      />
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>

    <main className="container mx-auto max-w-3xl min-h-screen pt-8">
      {children}
    </main>
  </div>
);

export default Layout;
