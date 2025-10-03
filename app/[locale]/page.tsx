import Hero from "./components/Hero";

export default function Home() {
  return (
    <>
      {/* Fondo de imagen */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <img
          src="/images/fondo.png"
          alt="fondo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido principal */}
      <div className="relative">
        <Hero />
        {/* Aquí irán los demás componentes */}
      </div>
    </>
  );
}
