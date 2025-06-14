import {HeroSection} from "@/components/hero-section";
import {LogoTicker} from "@/components/logo-ticker";
import {CallToAction} from "@/components/call-to-action";
import {Features} from "@/components/features";
import {Testimonials} from "@/components/testimonials";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <HeroSection/>
      <LogoTicker/>
      <Features/>
      <Testimonials/>
      <CallToAction/>
      <SiteFooter />
    </>
  );
}
