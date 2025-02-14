import React, { useState, useEffect } from 'react';
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import LinkButton from "../../share/UIElements/LinkButton/LinkButton";
import MenuButtom from "../../share/UIElements/MenuButton/MenuButtom";
import RightTooltip from "./RightTooltip/RightTooltip";
import SearchBar from "./SearchBar/SearchBar";
import Categories from "./Categories/Categories";
import { Link } from "react-router-dom";
import ContactIcon from "../../share/images/contact.svg";
import AboutIcon from"../../share/images/about.svg";
import CategoryIcon from "../../share/images/downArrow.svg";
const udemyBusinessMessage =
  "If u want to learn more about our website check the page below.";
const techOnUdemy =
  "Let's talk! Your inquiries and feedback drive us forward. Reach out, and we'll be right here to assist you.";

const Navigation = () => {
  const [categoryNames, setCategoryNames] = useState([]);

 



  const RightTooltipWithStyle = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "transparent",
      color: theme.palette.grey[900],
      borderRadius: 0,
      padding: 0,
    },
  }));

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: "background.paper",
            height: "7.2rem",
            px: "2.4rem",
            boxShadow: "0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%)",
          }}
        >
          <Toolbar disableGutters sx={{ my: "auto", gap: 1 }}>
          <Box>
            <a href="/">
              <img
                src="/images/header/recmoocLogo.png"
                alt="Udemy"
                width="91"
                height="65"
              />
            </a>
          </Box>

          <MenuButtom>
            <RightTooltipWithStyle
              title={<Categories categoriesData={categoryNames} />}
              placement="bottom-start"
            >
              <span>
              <img src={CategoryIcon} alt="Category" className="icon" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} />
                Categories
              </span>
            </RightTooltipWithStyle>
          </MenuButtom>

          <SearchBar />

          <MenuButtom>
            <Link to="/about">
              <RightTooltipWithStyle
                title={
                  <RightTooltip
                    text={udemyBusinessMessage}
                    buttonMessage="Learn about Recmooc4All"
                  />
                }
                placement="bottom-end"
              >
                <span style={{color:"black"}}>
                <img src={AboutIcon} alt="About" className="icon" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} /> About us {/* Adjust icon size */}
                </span>
              </RightTooltipWithStyle>
            </Link>
          </MenuButtom>

          <MenuButtom>
            <Link to="/contactus">
              <RightTooltipWithStyle
                title={
                  <RightTooltip text={techOnUdemy} buttonMessage="Learn more" />
                }
                placement="bottom-end"
              >
                <span style={{color:"black"}}>
                <img src={ContactIcon} alt="Contact" className="icon" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} /> Contact us {/* Adjust icon size */}
                </span>
              </RightTooltipWithStyle>
            </Link>
          </MenuButtom>

          <Link to="/login">
            <LinkButton
              fontSize="1.4rem"
              color="#005387"
              height="4rem"
              width="9rem"
            >
              Log in
            </LinkButton>
          </Link>

          <Link to="/register">
            <LinkButton 
              fontSize="1.4rem"
              color="#005387"
              height="4rem"
              width="9rem"
            >
              Sign up
            </LinkButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  </>
  );
};
export default Navigation;
