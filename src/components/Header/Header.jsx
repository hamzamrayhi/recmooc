import {
  HeaderContainer,
  ImageBoxContainer,
  ImageContainer,
} from "./Header.styles";
import Card from "./Card/Card";

const Header = () => {
  return (
    // <HeaderContainer>
    <ImageBoxContainer>
<ImageContainer src="/images/header/headerfinal.png" alt="ImageHeader" height={550} />
      <Card />
    </ImageBoxContainer>
    // </HeaderContainer>
  );
};

export default Header;
