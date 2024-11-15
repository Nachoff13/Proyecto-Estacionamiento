import React, { useState, useEffect } from 'react';
import { Navigation } from './components/navigation';
import { Header } from './components/header';
import { About } from './components/about';
import { Services } from './components/services';
import { Testimonials } from './components/testimonials';
import { Team } from './components/Team';
import { Contact } from './components/contact';
import JsonData from './data/data.json';
import SmoothScroll from 'smooth-scroll';
import './PresentacionPage.css';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true
});

export default function PresentacionPage() {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <About />
      <Services/>
      <Testimonials data={landingPageData.Testimonials} />
      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
}