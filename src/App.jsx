import { useEffect } from "react";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HeroCounters from "./components/HeroCounters";
import Pricing from "./components/Pricing";
import Services from "./components/Services";
import WhoShouldUse from "./components/WhoShouldUse";
import UserLevels from "./components/UserLevels";
import VideoSteps from "./components/VideoSteps";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import ChatbotWidget from "./components/Chatbot/ChatbotWidget";
import ScrollProgress from "./components/ScrollProgress";
import useScrollSpy from "./hooks/useScrollSpy";
import useSmoothHashNavigation from "./hooks/useSmoothHashNavigation";

// Section IDs matching navigation
const SECTION_IDS = ['hero', 'templates', 'features', 'pricing', 'how-to-use', 'contact'];

const App = () => {
  // ScrollSpy to track active section
  const { activeId } = useScrollSpy(SECTION_IDS, {
    rootMargin: '-20% 0px -35% 0px',
    offset: 80
  });

  // Smooth hash navigation
  const { updateHashOnScroll } = useSmoothHashNavigation({
    offset: 80,
    updateHash: true
  });

  // Update hash when active section changes
  useEffect(() => {
    if (activeId) {
      updateHashOnScroll(activeId);
    }
  }, [activeId, updateHashOnScroll]);

  return (
    <>
      <ScrollProgress type="global" />
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header activeId={activeId} />
        <Hero />
        <HeroCounters />
        <WhoShouldUse />
        <Benefits />
        <Collaboration />
        <Services />
        <UserLevels />
        <VideoSteps />
        <Pricing />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
      <ChatbotWidget />
      <ButtonGradient />
    </>
  );
};

export default App;
