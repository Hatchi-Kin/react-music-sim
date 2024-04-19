import LandingNavbar from "@/components/LandingNavbar";
import LandingHero from "@/components/LandingHero";
import LandingLayout from "@/app/(landingpage)/LandingLayout";

export default function LandingPage() {
  return (
    <LandingLayout>
      {/* Navbar */}
      <LandingNavbar />
      {/* Hero */}
      <LandingHero />
    </LandingLayout>
  );
}
