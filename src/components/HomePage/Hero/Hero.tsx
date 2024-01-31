import React, { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import './Hero.css';
import Logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import Swing from '../../../assets/swing.jpg';
import RangeImg from '../../../assets/range.jpg';

//Parent Div
const Container = styled.div`
  height: 100vh;
  background-color: pink;
  @media screen and (max-width: 768px) {
    overflow-y: hidden;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

//Buttons
const HeroButtonTalk = styled.div`
  overflow: hidden;
  border-radius: 2px;
  outline: none;
  border: none;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  background-color: #081542;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f8f7f7;
  border: 1px solid #081542;
  font-size: 20px;
  width: 200px;
  height: 65px;
  &:hover {
    background-color: rgb(250, 251, 252);
    color: #242424;
    transition: all 0.3s ease-out;
  }
  @media screen and (max-width: 1400px) {
    width: 200px;
    height: 75px;
  }
`;
const HeroButtonTalk2 = styled.div`
  overflow: hidden;
  border-radius: 2px;
  outline: none;
  border: none;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  background-color: #000;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f8f7f7;
  color: #f8f7f7;
  color: #000;
  border: 1px solid #081542;
  font-size: 20px;
  width: 200px;
  height: 65px;
  &:hover {
    background-color: #000;
    color: #242424;
    color: #fff;
    transition: all 0.3s ease-out;
  }
  @media screen and (max-width: 1400px) {
    width: 200px;
    height: 75px;
  }
`;
const HeroButtonVid = styled.div`
  padding: 0px 60px;
  overflow: hidden;
  border-radius: 2px;
  outline: none;
  font-family: 'Poppins', sans-serif;
  border: none;
  cursor: pointer;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: content;
  color: #f8f7f7;
  font-size: 20px;
  width: 200px;
  height: 65px;
  text-decoration: none;
  &:hover {
    background-color: rgb(250, 251, 252);
    color: #242424;
    transition: all 0.3s ease-out;
  }
  @media screen and (max-width: 1400px) {
    padding: 0px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 75px;
  }
`;
const BtnWrap = styled.div`
  width: 600px;
  margin-left: 16vw;
  display: flex;
  gap: 50px;
  margin-top: 40px;
  @media screen and (max-width: 1400px) {
    gap: 25px;
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;
    gap: 10px;
    margin-top: 0px;
    margin-left: 10vw;
  }
`;
const Img = styled.img`
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  position: sticky;
  right: 0;
  top: 0;
`;

const Hero : FC = () => {
  const [loading3, setLoading3] = useState(false);
  useEffect(() => {
    setLoading3(true);
    setTimeout(() => {
      setLoading3(false);
    }, 5000);
  }, []);
  return (
    <>
      <Container>
        <div>
          {/*Left Side*/}
          <div id="left-side" className="side">
           
            <h2 className="title">
              <div className="title-width">
                FIND YOUR <span className="fancy">SWING</span>
              </div>
            </h2>
            <div className="sub">
              Shop our latest projects below
            </div>
            <BtnWrap>
              <Link to="/sign-in">
                <HeroButtonVid>SIGN IN</HeroButtonVid>
              </Link>
              <Link to="/contact">
                <HeroButtonTalk>Let's Talk</HeroButtonTalk>
              </Link>
            </BtnWrap>
          </div>
          {/*Right Side*/}
          <div id="right-side" className="side moving-div">
            <h2 className="title">
              <div className="title-width">
                FIND YOUR <span className="fancy">RANGE</span>
              </div>
            </h2>
            <div className="sub white">
              Shop our latest products below
            </div>
            <BtnWrap>
              <Link to="/sign-in">
                <HeroButtonVid>Sign In</HeroButtonVid>
              </Link>
              <Link to="/contact">
                <HeroButtonTalk2>Let's Talk</HeroButtonTalk2>
              </Link>
            </BtnWrap>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Hero;
