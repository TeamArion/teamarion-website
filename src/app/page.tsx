import {HeroSection} from "@/components/hero-section";
import {LogoTicker} from "@/components/logo-ticker";
import {CallToAction} from "@/components/call-to-action";
import {Features} from "@/components/features";
import {Testimonials} from "@/components/testimonials";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import CardCaroursalDemo from "@/components/team-carousel";
import { WobbleCardDemo } from "@/components/beyond-fs";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <HeroSection/>
      <Features/>
      <LogoTicker/>
      <Testimonials/>
      <CardCaroursalDemo />
      <WobbleCardDemo />
      <CallToAction/>
      <SiteFooter />
    </>
  );
}
