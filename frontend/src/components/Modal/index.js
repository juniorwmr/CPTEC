import React from "react";
import PropTypes from "prop-types";

import { Container, Content } from "./styles";

export default function MyModal({
  display,
  modalTitle,
  handleHideModal,
  children,
  bg,
  borderRadius,
}) {
  return (
    <Container display={display ? 1 : 0}>
      <Content bg={bg} borderRadius={borderRadius}>
        <header>
          <h1>{modalTitle}</h1>
          <button type="button" onClick={handleHideModal}>
            {/* FECHAR */}
          </button>
        </header>
        {children}
      </Content>
    </Container>
  );
}

MyModal.propTypes = {
  display: PropTypes.number.isRequired,
  modalTitle: PropTypes.string,
  children: PropTypes.element.isRequired,
  bg: PropTypes.string,
  borderRadius: PropTypes.number,
};

MyModal.defaultProps = {
  modalTitle: "",
  bg: "none",
  borderRadius: "0px",
};
