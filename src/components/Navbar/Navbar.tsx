import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MenuIcon.css';
import styled from 'styled-components';
import GolfLogo from '../../assets/logo.png';

//Parent divs
const Container = styled.div`
  background: #081542;
  height: 100px;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

//Menu Icon Wrapper
const MenuIconWrap = styled.div`
  overflow-y: hidden;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 75px;
  @media screen and (max-width: 768px) {
    margin-left: 0px;
    margin-top: -5px;
  }
`;

//Logo
const Logo = styled.img`
  height: 100px;
  margin-right: 75px;

  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    height: 40px;
    margin-right: 55px;
  }
`;

//Sign In and Cart Icons
const LinksWrap = styled.div`
  position: absolute;
  right: 0;
  margin-right: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100%;
  @media screen and (max-width: 768px) {
    margin-top: -5px;
    margin-right: 25px;
    gap: 10px;
  }
`;
const Circle = styled.div`
  //position: relative;
  //top: -15px;
  //right: -10px; 
  width: 30px;
  height: 30px;
  background-color: #ba9f07;
  background-color: #e10000;
  border-radius: 50%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 800;
  z-index: 101;
  @media screen and (max-width: 768px) {
    right: 0px;
    width: 25px;
    height: 25px;
  }
`;
const CartContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`;
const IconWrap = styled.div`
  position: relative;
`;
const I = styled.i`
  font-size: 2.2rem;
  color: #fff;
  transition: 500ms ease-in-out;
  overflow-y: hidden;

  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }
`;

interface AppProps {
  toggle: () => void;
  isOpen: boolean;
  toggle2: () => void;
} 

const Navbar: FC<AppProps> = ({ toggle, isOpen, toggle2 }) => {
const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const [isHovered2, setIsHovered2] = useState(false);

  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };
  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };
 
  return (
    <Container>
      <Wrapper>
        {/*Menu Icon*/}
        <MenuIconWrap  >
          <div
            className={`menu-icon ${isOpen ? 'open' : ''}`}
            onClick={toggle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div
              className={`${isHovered ? 'bar bar2 bar-hovered' : 'bar bar2'}`}
            ></div>
          </div>
        </MenuIconWrap>
        {/*Logo*/}
        <Link to="/">
          <Logo src={GolfLogo} alt="logo" onClick={toggle2} />
          </Link>
          {/*Sign In and Cart*/}
        <LinksWrap onClick={toggle2}>
            <Link to="/sign-in">
              <IconWrap>
              <I className="fa-regular fa-user"></I>
              </IconWrap>
            </Link>
          <Link to="/cart">
            <CartContainer>
              <I className="fa-solid fa-basket-shopping mt-[-7px]"></I>
              <Circle>3</Circle>
            </CartContainer>
          </Link>
        </LinksWrap>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
