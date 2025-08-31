import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import Clients from "@/components/ui/logo-grid";
import { Hero } from "@/components/ui/hero-with-image-text-and-two-buttons";
import { Feature } from "@/components/ui/feature-section-with-grid"
import { RulerCarousel, type CarouselItem } from "@/components/ui/ruler-carousel";




export default function Home() {
    const originalItems: CarouselItem[] = [
    { id: 1, title: "Apply" },
    { id: 2, title: "Interview" },
    { id: 3, title: "Take Home Assignment" },
    { id: 4, title: "Follow Up Interview" },
    { id: 5, title: "Decision Notification" }
  ];
  return (
    <>
      <SiteHeader />
      <Hero />
      <Feature />
      <Clients />
      <RulerCarousel originalItems={originalItems} />
      <SiteFooter />
    </>
  );
}
