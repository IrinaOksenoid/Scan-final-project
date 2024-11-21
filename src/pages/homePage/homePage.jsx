// Home.jsx
import React from 'react';
import {Header, Footer} from '../../components/common';
import {SeparatorImage, Slider, TariffCards, WelcomeSection} from '../../components/HomePage'


function Home() {
  return (
    <div>
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
