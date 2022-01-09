import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";
import Pokedex from "pokedex-promise-v2";

import Footer from "../components/Footer";

export default function Home({ pokemonList }) {
  console.log(pokemonList);

  return (
    <Layout title={"Pokedex on Next.js"}>
      <h1 className="text-3xl font-bold text-center mb-4 text-white">
        Choose your Pokemon!
      </h1>
      <Footer />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {pokemonList.map((pokemon, index) => {
          return (
            <div
              key={index}
              className="transition-all ease-in border border-black bg-purple-200 shadow rounded-lg p-4 hover:shadow-lg hover:text-lg"
            >
              <Link href={`/pokemon/?id=${index + 1}`}>
                <a>
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    width={150}
                    height={150}
                    layout="responsive"
                  />
                  <p className="text-center capitalize">{pokemon.name}</p>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const dex = new Pokedex();
    const pokemons = await dex.getPokemonsList({ limit: 151 });

    const pokemonList = pokemons.results.map((data, index) => {
      const paddedId = ("00" + (index + 1)).slice(-3);

      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;

      return {
        ...data,
        image,
      };
    });

    return {
      props: { pokemonList },
    };
  } catch (e) {
    console.error(e);
  }
}
