import  LandingNavbar from "@/components/landingnavbar";
import LandingHero from "@/components/landinghero";
import LandingLayout from '@/app/(landingpage)/LandingLayout';

export default function LandingPage() {
  return (
    <LandingLayout>
      { /* Navbar */ }
        <LandingNavbar />
        { /* Hero */ }
        <LandingHero />
    </LandingLayout>
  );
}