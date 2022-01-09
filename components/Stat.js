const bgColors = {
  hp: "bg-red-400",
  attack: "bg-orange-300",
  defense: "bg-yellow-200",
  "special-attack": "bg-indigo-400",
  "special-defense": "bg-emerald-300",
  speed: "bg-pink-400",
};

export default function Stat({ stat }) {
  return (
    <div
      className={
        "rounded-xl shadow-md flex flex-col " + bgColors[stat.stat.name]
      }
    >
      <p
        className={
          "text-lg font-bold place-self-start mt-2 ml-2 " +
          (stat.stat.name !== "hp" ? "capitalize" : "uppercase")
        }
      >
        {stat.stat.name === "special-attack"
          ? "Sp. Atk."
          : stat.stat.name === "special-defense"
          ? "Sp. Def."
          : stat.stat.name}
      </p>
      <p className="text-4xl place-self-center p-1 m-1">{stat.base_stat}</p>
    </div>
  );
}
