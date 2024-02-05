import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MenuIcon.css';
import styled from 'styled-components';
import GolfLogo from '../../assets/logo.png';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../config/firebase-config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useAuth0 } from '@auth0/auth0-react';

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
  right: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0px;
  height: 100%;
  @media screen and (max-width: 768px) {
    margin-top: -5px;
    right: 25px;
    gap: 10px;
  }
`;
const Circle = styled.div`
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
  transition: 300ms ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }
`;
const IconWrap = styled.div`
  //position: relative;
  transition: 300ms ease-in-out;

  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }
`;
const I = styled.i`
  font-size: 2.2rem;
  color: #fff;
  transition: 500ms ease-in-out;
  overflow-y: hidden;
`;

interface AppProps {
  toggle: () => void;
  isOpen: boolean;
  toggle2: () => void;
} 
interface CartItem {
  title: string;
  price: number;
  id: string;
  image?: string,
}

const Navbar: FC<AppProps> = ({ toggle, isOpen, toggle2 }) => {

  //Menu Icon Hover Effect
const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  //Get cartItems Collection to Display Length of cartItems
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);

  const cartItemsRef = collection(db, "cartItems");

  const fetchCartItems = async () => {
    try {
      const data = await getDocs(cartItemsRef);
      const cartData: CartItem[] = data.docs.map((doc) => ({...doc.data(), id: doc.id} as CartItem));
      setCartProducts(cartData);
    } catch(err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);
  
  //Get Profile Photo if Signed in
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  useEffect(() => {
    const onAuthChange = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });

    return () => onAuthChange();
  })

  //Get User Info from Auth0
  const { user, isAuthenticated } = useAuth0();

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
        <LinksWrap className="w-[150px]" onClick={toggle2}>
        { isAuthenticated && user ? 
                  (
                    
                    <div className="rounded-[50%] flex items-center justify-center transition duration-300 ease hover:translate-y-[-5px] hover:cursor-pointer">
                      <Link to="/sign-in-with-auth0">
                      <img className="h-[50px] w-[70px] object-cover" src={user?.picture} alt={user?.name} />
                      </Link>
                    </div>
                  )
                  :
                  <IconWrap className="w-full h-full flex items-center justify-center">
                  <Link to="/sign-in" >
                  <I className="fa-regular fa-user"></I>
                  </Link>
                  { firebaseUser===null ? 
                  <div className="mt-[-20px]">
                    <i className="fa-solid fa-circle-xmark h-[20px] w-[20px] text-[#e10000]"></i>
                  </div>
                  : 
                  <div className="mt-[-20px]">
                    <i className="fa-solid fa-circle-check h-[20px] w-[20px] text-green-600 "></i>
                    </div>
                    }
                  </IconWrap>
                }
            <CartContainer className="flex items-center justify-center h-full">
          <Link to="/cart">
              <I className="fa-solid fa-basket-shopping  w-full"></I>
              </Link>
              <Circle className="mt-[-30px]">{cartProducts.length}</Circle>
            </CartContainer>
            
        </LinksWrap>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
