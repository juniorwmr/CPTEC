import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const NavBar = (props) => {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">CPTEC</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink
              onClick={(e) => {
                history.push("/");
              }}
            >
              Home
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Gerenciar
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                onClick={(e) => {
                  history.push("/register");
                }}
              >
                Realizar Cadastro
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                onClick={(e) => {
                  history.push("/search");
                }}
              >
                Realizar Busca
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <DropdownItem divider />
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
