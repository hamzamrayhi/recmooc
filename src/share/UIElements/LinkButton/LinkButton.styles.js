import styled from "styled-components";

export const LinkButtonContainer = styled.div`
  background-color: ${(props) => (props.color === "#005387" ? "#005387" : "transparent")};
  color: ${(props) => (props.color === "#005387" ? "#fff" : "#fff")};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  text-decoration: none;
  position: relative;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  padding: 0rem 1.2rem;
  border: 1px solid transparent; /* Use transparent border for a cleaner look */
  cursor: pointer;
  font-weight: 700;
  line-height: 1.2;
  font-size: ${(props) => props.fontSize};
  border-radius: 8px; /* Add border-radius for a rounded look */
  overflow: hidden; /* Ensure the border-radius applies to the child elements */

  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease; /* Add smooth transitions for background, color, and transform */

  &:hover {
    background-color: ${(props) => (props.color === "#005387" ? "#004670" : "#eceff1")};
    color: ${(props) => (props.color === "#005387" ? "#fff" : "#333")};
    transform: translateY(-2px); /* Lift the button slightly on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle box-shadow for depth */
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, #005387, #0088cc);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover:before {
    opacity: 1;
  }
`;

// Example usage:
// <LinkButtonContainer color="#005387" height="40px" width="120px" fontSize="16px">Cool Button</LinkButtonContainer>
