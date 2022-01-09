/* eslint-disable @next/next/no-img-element */
import Pokedex from "pokedex-promise-v2";

import Layout from "../components/Layout";
import Link from "next/link";

import Type from "../components/Type";
import Stat from "../components/Stat";
import Footer from "../components/Footer";

export default function Pokemon({ pokemon }) {
  return (
    <Layout title={`${pokemon.name} | Pokedex`}>
      <div className="grid grid-cols-2 gap-4 bg-violet-200 shadow rounded-lg p-4 m-4">
        <div className="flex flex-col justify-center align-middle">
          <p className="text-center text-2xl font-bold mb-4">{pokemon.name}</p>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="transition-transform ease-out mx-auto hover:scale-125"
          />
        </div>

        <div className="flex flex-col justify-around">
          <div className="flex flex-col md:flex-row justify-around flex-wrap mb-4">
            {pokemon.properties.map((prop, index) => {
              return (
                <div key={index} className="text-center mt-2 md:mt-0">
                  <span className="text-sm italic">{prop.name}</span>
                  <p className="text-xl md:mt-2">{prop.value}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col flex-auto text-center mt-4">
            <span className="text-xl font-bold my-2">Abilities</span>
            {pokemon.abilities.map((ability, index) => {
              return (
                <div
                  key={index}
                  className={
                    "transition-transform ease-in-out p-1 m-1 rounded-xl hover:scale-105 " +
                    (ability.is_hidden
                      ? "bg-gradient-to-r from-slate-500 to-zinc-500"
                      : "bg-gradient-to-r from-teal-500 to-emerald-500")
                  }
                >
                  <p className="capitalize">
                    {ability.ability.name.replace("-", " ")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-violet-200 shadow rounded-lg p-4 m-4">
        <div className="flex flex-col justify-start">
          <p className="text-center text-2xl font-bold mb-4">Type</p>
          <div className="flex flex-col md:flex-row justify-center">
            {pokemon.types.map((type, index) => {
              return <Type key={index} type={type.type.name} />;
            })}
          </div>
        </div>

        <div className="flex flex-col justify-center align-middle">
          <p className="text-center text-2xl font-bold mb-4">Base Stats</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {pokemon.stats.map((stat, index) => {
              return <Stat key={index} stat={stat} />;
            })}
          </div>
        </div>
      </div>

      <h5 className="mt-6 text-center">
        <Link href={"/"}>
          <a className="text-white underline underline-offset-1">
            &lt; Go back
          </a>
        </Link>
      </h5>

      <Footer />
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const id = query.id;

    const dex = new Pokedex();

    const pokemonData = await dex.getPokemonByName(id);

    const paddedId = ("00" + id).slice(-3);

    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;

    const pokemon = {
      name: pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1),
      image: image,
      properties: [
        {
          name: "ID",
          value: "#" + paddedId,
        },
        {
          name: "Height",
          value: pokemonData.height * 10 + "cm", // decimeter to centimetre
        },
        {
          name: "Weight",
          value: pokemonData.weight / 10 + "kg", // hectogram to kilograms
        },
      ],
      abilities: pokemonData.abilities,
      types: pokemonData.types,
      stats: pokemonData.stats,
    };

    return {
      props: { pokemon },
    };
  } catch (e) {
    console.error(e);
  }
}
