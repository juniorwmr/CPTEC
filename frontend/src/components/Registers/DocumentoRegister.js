import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

import api from "../../services/api";

export default function Form() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button className="ButtonOpenRegister" onClick={() => setShow(true)}>
        Cadastrar
      </Button>

      <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Documento
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DocumentoRegister />
        </Modal.Body>
      </Modal>
    </>
  );
}

export function DocumentoRegister() {
  const success = () => toast.success("Cadastrado com sucesso!");
  const error = () => toast.error("Tente novamente!");

  const [peritos, setPeritos] = useState([]);
  const [tipodocs, setTipoDocs] = useState([]);
  const [perito, setPerito] = useState(0);
  const [tipodoc, setTipoDoc] = useState(0);
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    async function SearchPeritos() {
      const { data } = await api.get("/perito");
      setPeritos(data);
    }
    async function SearchTipoDocs() {
      const { data } = await api.get("/tipo_documento");
      setTipoDocs(data);
    }
    SearchPeritos();
    SearchTipoDocs();
  }, []);

  function renderPeritos() {
    return peritos.map((perito, index) => (
      <option key={index} value={perito.id}>
        {perito.name}
      </option>
    ));
  }

  function renderTipoDoc() {
    return tipodocs.map((tipodoc, index) => (
      <option key={index} value={tipodoc.id}>
        {tipodoc.tipo_documento}
      </option>
    ));
  }

  async function addDocumento(data) {
    try {
      const response = await api.post("/documento", data);
      if (response.status === 200) {
        success();
      }
    } catch (e) {
      error();
    }
  }

  function HandleSubmit(e) {
    e.preventDefault();
    const data = {
      id_perito: perito,
      id_tipo_documento: tipodoc,
      description: descricao,
    };
    addDocumento(data);
  }

  return (
    <form className="form-register" onSubmit={(e) => HandleSubmit(e)}>
      <div className="input-group">
        <div className="input-block">
          <label>Perito</label>
          <select
            value={perito}
            onChange={(e) => setPerito(e.target.value)}
            className="form-control"
          >
            <option value="0" disabled>
              Selecione
            </option>
            {renderPeritos()}
          </select>
        </div>
        <div className="input-block">
          <label>Tipo de Documento</label>
          <select
            required
            value={tipodoc}
            onChange={(e) => setTipoDoc(e.target.value)}
            className="form-control"
          >
            <option value="0" disabled>
              Selecione
            </option>
            {renderTipoDoc()}
          </select>
        </div>
        <div className="input-block">
          <label>Descrição</label>
          <textarea
            className="form-control"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={{ resize: "none" }}
            rows="4"
            cols="30"
            maxLength="100"
            autoCapitalize="sentences"
            required
            autoComplete="off"
            name="descricao"
            placeholder="Digite a descrição do documento"
          ></textarea>
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}
