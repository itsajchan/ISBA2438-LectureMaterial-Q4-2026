import TopBar from "./_components/TopBar";
import Header from "./_components/Header";
import CategoryNav from "./_components/CategoryNav";
import Hero from "./_components/Hero";
import CategoryGrid from "./_components/CategoryGrid";
import WeeklyDeals from "./_components/WeeklyDeals";
import Services from "./_components/Services";
import Locations from "./_components/Locations";
import Newsletter from "./_components/Newsletter";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <CategoryNav />
      <main className="flex-1">
        <Hero />
        <CategoryGrid />
        <WeeklyDeals />
        <Services />
        <Locations />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
