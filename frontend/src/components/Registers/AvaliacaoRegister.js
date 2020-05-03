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
            Avaliação
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AvaliacaoRegister />
        </Modal.Body>
      </Modal>
    </>
  );
}

export function AvaliacaoRegister({ name }) {
  const [pericias, setPericias] = useState([]);
  const [pericia, setPericia] = useState(0);
  const [avaliacao, setAvaliacao] = useState("");

  const success = () => toast.success("Cadastrado com sucesso!");
  const error = () => toast.error("Tente novamente!");

  useEffect(() => {
    async function SearchPericia() {
      const { data } = await api.get("/pericia");
      setPericias(data);
    }
    SearchPericia();
  }, []);

  function renderPericias() {
    return pericias.map((pericia, index) => (
      <option key={index} value={pericia.id}>
        {pericia.numero_processo}
      </option>
    ));
  }

  async function addAvaliacao(data) {
    try {
      const response = await api.post("/avaliacao", data);
      if (response.status === 200) {
        success();
      }
    } catch (e) {
      error();
    }
  }

  function HandleSubmit(e) {
    e.preventDefault();
    const data = { id_pericia: pericia, avaliacao };
    addAvaliacao(data);
  }

  return (
    <form className="form-register" onSubmit={(e) => HandleSubmit(e)}>
      <div className="input-group avaliacao">
        <div className="input-block">
          <label>Perícia</label>
          <select
            value={pericia}
            onChange={(e) => setPericia(e.target.value)}
            className="form-control"
          >
            <option value="0" disabled>
              Número do Processo
            </option>
            {renderPericias()}
          </select>
        </div>
        <div className="input-block">
          <label>Avaliação</label>
          <textarea
            className="form-control"
            style={{ resize: "none" }}
            rows="6"
            cols="32"
            maxLength="300"
            autoCapitalize="sentences"
            required
            autoComplete="off"
            name="descricao"
            value={avaliacao}
            onChange={(e) => setAvaliacao(e.target.value)}
            placeholder="Digite a descrição do documento"
          ></textarea>
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}
