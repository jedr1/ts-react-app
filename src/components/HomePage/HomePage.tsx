import React, { FC } from 'react'
import styled from 'styled-components';
import Hero from './Hero/Hero';
import swing from '../../assets/swing.jpg';
import Products from '../Products/Products';
import Shop from './Shop/Shop';

const BackgroundImage = styled.img`
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  position: fixed;
  top: 0;
`;
const Overlay = styled.div`
  position: relative;
  z-index: 99;
`;

const HomePage: FC = () => {
  return (
    <div>
      <Hero />
      <BackgroundImage src={swing} alt="" />
      <Overlay>
      <Shop />
      </Overlay>
    </div>
  )
}

export default HomePage;