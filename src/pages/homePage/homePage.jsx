// Home.jsx
import React from 'react';
import {Header, Footer} from '../../components/common';
import {SeparatorImage, Slider, TariffCards, WelcomeSection} from '../../components/HomePage'
import './homePage.css';


function Home() {
  return (
    <div className='home_page'>
      <Header />
      <WelcomeSection />
      <Slider />
      <SeparatorImage />
      <TariffCards />
      <Footer />
    </div>
  );
}

export default Home;
