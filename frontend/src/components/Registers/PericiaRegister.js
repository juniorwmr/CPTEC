import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import NumberFormat from "react-number-format";
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
            Perícia
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PericiaRegister />
        </Modal.Body>
      </Modal>
    </>
  );
}

export function PericiaRegister() {
  const success = () => toast.success("Cadastrado com sucesso!");
  const error = () => toast.error("Tente novamente!");

  const [peritos, setPeritos] = useState([]);
  const [comarcas, setComarcas] = useState([]);
  const [nProcesso, setnProcesso] = useState("");
  let [perito, setPerito] = useState(0);
  let [comarca, setComarca] = useState(0);
  const [date, setDate] = useState("");
  let [honorarios, setHonorarios] = useState(0);

  useEffect(() => {
    async function SearchComarcas() {
      const { data } = await api.get("/comarca");
      setComarcas(data);
    }
    async function SearchPeritos() {
      const { data } = await api.get("/perito");
      setPeritos(data);
    }
    SearchPeritos();
    SearchComarcas();
  }, []);

  function renderComarcas() {
    return comarcas.map((comarca, index) => (
      <option key={index} value={comarca.id}>
        {comarca.comarca}
      </option>
    ));
  }

  function renderPeritos() {
    return peritos.map((perito, index) => (
      <option key={index} value={perito.id}>
        {perito.name}
      </option>
    ));
  }

  async function addPericia(data) {
    try {
      const response = await api.post("/pericia", data);

      if (response.status === 200) {
        success();
      }
    } catch (e) {
      error();
    }
  }

  function HandleSubmit(e) {
    e.preventDefault();
    Number(perito);
    Number(comarca);
    Number(honorarios);
    const data = {
      id_perito: perito,
      numero_processo: nProcesso,
      id_comarca: comarca,
      date,
      honorarios,
    };
    addPericia(data);
  }

  return (
    <form className="form-register" onSubmit={(e) => HandleSubmit(e)}>
      <div className="input-group">
        <div className="input-block">
          <label>Número do Processo</label>
          <NumberFormat
            format="#######.####.##.####"
            allowEmptyFormatting
            className="form-control"
            mask="_"
            name="phone"
            id="phone"
            required
            value={nProcesso}
            onChange={(e) => setnProcesso(e.target.value)}
          />
        </div>
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
          <label>Comarca</label>
          <select
            value={comarca}
            onChange={(e) => setComarca(e.target.value)}
            className="form-control"
          >
            <option value="0" disabled>
              Selecione
            </option>
            {renderComarcas()}
          </select>
        </div>
        <div className="input-block">
          <label>Data</label>
          <NumberFormat
            format="##-##-####"
            placeholder="DD-MM-YYYY"
            mask={"_"}
            className="form-control"
            name="data"
            id="data"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label>Honorários</label>
          <NumberFormat
            maxLength="10"
            name="honorarios"
            className="form-control"
            id="honorario"
            required
            value={honorarios}
            onChange={(e) => setHonorarios(e.target.value)}
          />
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}
