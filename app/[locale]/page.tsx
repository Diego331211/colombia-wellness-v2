import Hero from "./components/Hero";
import DataSections from "./components/datasections";
import CitySection from "./components/citysection";
import CounterSection from "./components/counter-section";
import EventTimeline from "./components/timeline";
import SponsorshipTiers from "./components/sponsor-ships";
import EndSection from "./components/end";

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
        <DataSections />
        <CitySection />
        <CounterSection />
        <EventTimeline />
        <SponsorshipTiers />
        <EndSection />
      </div>
    </>
  );
}
