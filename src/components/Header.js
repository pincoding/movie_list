import { Link } from "react-router-dom";
import { routes } from "../routes";
import { colors } from "./GlobalStyled";
import styled from "styled-components";
import { useEffect, useRef } from "react";

const Container = styled.header`
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  @media screen and (max-width: 450px) {
    padding: 20px 20px;
  }
`;
const Logo = styled.div`
  font-size: 28px;
  font-weight: 700;
  a {
    color: ${colors.point};
  }
`;
const Nav = styled.ul`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  li {
    margin-left: 100px;
  }

  @media screen and (max-width: 450px) {
    li {
      margin-left: 30px;
      font-size: 16px;
    }
  }
`;

export const Header = () => {
  const headerRef = useRef();

  //상태관리,useState 특정값을 지정하는 변수에 초기값 값을 변경
  //엘리먼트를 변경,참조할때 useRef

  const scrollHandler = () => {
    const pageY = window.scrollY;
    const current = headerRef.current;

    console.log(current);

    if (pageY >= 200) {
      current.style.position = "fixed";
      current.style.backgroundColor = "rgba(0,0,0,0.7)";
      current.style.backdropFilter = "blur(3px)"; //흐리게
    } else {
      current.style.position = "absolute";
      current.style.backgroundColor = "transparent"; // 투명도
      current.style.backdropFilter = "blur(0px)";
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
  });

  return (
    <Container ref={headerRef}>
      <Logo>
        <Link to={routes.home}>PinMoive</Link>
      </Logo>

      <Nav>
        <li>
          <Link to={routes.home}>Home</Link>
        </li>
        <li>
          <Link to={routes.search}>SEARCH(검색)</Link>
        </li>
      </Nav>
    </Container>
  );
};
