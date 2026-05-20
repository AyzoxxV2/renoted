import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import ConversionBoost from '@/components/sections/ConversionBoost'
import WhyTeddy from '@/components/sections/WhyTeddy'
import Services from '@/components/sections/Services'
import HowItWorks from '@/components/sections/HowItWorks'
import Aides from '@/components/sections/Aides'
import SolteoWidget from '@/components/sections/SolteoWidget'
import Testimonials from '@/components/sections/Testimonials'
import About from '@/components/sections/About'
import LocalSEO from '@/components/sections/LocalSEO'
import BeforeContact from '@/components/sections/BeforeContact'
import ContactForm from '@/components/sections/ContactForm'
import FAQ from '@/components/sections/FAQ'
import Legal from '@/components/sections/Legal'
import PhoneButton from '@/components/ui/PhoneButton'
import CookieBanner from '@/components/ui/CookieBanner'
import ScrollToTop from '@/components/ui/ScrollToTop'

export default function HomePage() {
  return (
    <>
      <Header />

      <main id="main-content">
        <Hero />
        <TrustBar />
        <ConversionBoost />
        <WhyTeddy />
        <Services />
        <HowItWorks />
        <Aides />
        <SolteoWidget />
        <Testimonials />
        <About />
        <LocalSEO />
        <BeforeContact />
        <ContactForm />
        <FAQ />
        <Legal />
      </main>

      <Footer />

      {/* Floating / fixed UI elements */}
      <PhoneButton />
      <ScrollToTop />
      <CookieBanner />
    </>
  )
}
