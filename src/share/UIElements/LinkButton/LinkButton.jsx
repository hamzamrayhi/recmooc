import { LinkButtonContainer } from "./LinkButton.styles";

const LinkButton = ({
  children,
  color = "blue",
  fontSize = "1.6rem",
  height = "auto",
  width = "auto",
}) => {
  return (
    <LinkButtonContainer
      color={color}
      fontSize={fontSize}
      height={height}
      width={width}
    >
      {children}
    </LinkButtonContainer>
  );
};

export default LinkButton;
