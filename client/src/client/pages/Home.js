import React from 'react';
import '../../assets/styles/client/home.scss';

const Home = () => {
  return (
    <section>
      <div className='containerHome'>
          <div className='containerHomeOne'>
              <img src={'https://drive.google.com/uc?id=1n-OQWB1GwH5WDWfOct_5xkT_5Xs3LQtH'} alt='logo' />
              <p>Individuality crafted, tailored for you!</p>
          </div>
          <div className='containerHomeTwo'>
              <div className='hero'>
                <div className='squareTilt'></div>
                <img src={'https://drive.google.com/uc?id=1bIx75QTXyAxQopslq6asSnA-jXv8kyoT'} alt='imageFlex' />
              </div>
              <button>INQUIRE NOW</button>
          </div>

      </div>
    </section>
  );
};

export default Home;