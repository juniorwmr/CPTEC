import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import NumberFormat from "react-number-format";
import { BatteryLoading } from "react-loadingg";
import { toast } from "react-toastify";

import api from "../../services/api";

import Loading from "../Loading/Loading";
import MyModal from "../Modal/index";

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
            Perito
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PeritoRegister />
        </Modal.Body>
      </Modal>
    </>
  );
}

export function PeritoRegister() {
  const [loadingComarca, setLoadingComarca] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(0);
  const [loadingEspecialidade, setLoadingEspecialidade] = useState(false);
  const [comarcas, setComarcas] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [pessoaTipo, setPessoaTipo] = useState("cpf");
  let [pessoaCPF, setPessoaCPF] = useState("");
  let [pessoaCNPJ, setPessoaCNPJ] = useState("");
  let [status, setStatus] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [especialidade, setEspecialidade] = useState(0);
  const [phone, setPhone] = useState("");
  let [comarca, setComarca] = useState(0);
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");

  const success = () => toast.success("Cadastrado com sucesso!");
  const error = () => toast.error("Tente novamente!");

  useEffect(() => {
    function onFocus() {
      const input = document.querySelector("input#name");
      input.focus();
    }

    async function SearchComarcas() {
      setLoadingComarca(true);
      const { data } = await api.get("/comarca");
      setComarcas(data);
      setLoadingComarca(false);
    }

    async function SearchEspecialidades() {
      setLoadingEspecialidade(true);
      const { data } = await api.get("/especialidade");
      setEspecialidades(data);
      setLoadingEspecialidade(false);
    }
    SearchComarcas();
    SearchEspecialidades();
    onFocus();
  }, []);

  function renderComarcas() {
    return comarcas.map((comarca, index) => (
      <option key={index} value={comarca.id}>
        {comarca.comarca}
      </option>
    ));
  }

  function renderEspecialidades() {
    return especialidades.map((especialidade, index) => (
      <option key={index} value={especialidade.id}>
        {especialidade.especialidade}
      </option>
    ));
  }

  function cleanFields() {
    setName("");
    setEmail("");
    setStatus(1);
    setPessoaTipo("cpf");
    setPessoaCPF("");
    setPessoaCNPJ("");
    setComarca(0);
    setDistrict("");
    setEspecialidade(0);
    setPhone("");
    setStreet("");
    setNumber("");
  }

  async function SavePerito(data) {
    setLoadingSubmit(1);
    try {
      const response = await api.post("/perito", data);
      if (response.status === 200) {
        setLoadingSubmit(0);
        success();
      }
    } catch (e) {
      setLoadingSubmit(0);
      error();
    }
  }

  function HandleSubmit(e) {
    e.preventDefault();
    if (pessoaTipo === "cpf") {
      pessoaCNPJ = null;
    } else {
      pessoaCPF = null;
    }
    status = parseInt(status);
    comarca = parseInt(comarca);
    const data = {
      name,
      email,
      status,
      cpf: pessoaCPF,
      cnpj: pessoaCNPJ,
      phone,
      id_comarca: comarca,
      district,
      street,
      number,
      especialidade,
    };
    SavePerito(data);
    cleanFields();
  }

  return (
    <form className="form-register" onSubmit={(e) => HandleSubmit(e)}>
      <div className="input-group">
        <div className="input-block">
          <label>Nome Completo</label>
          <input
            maxLength="50"
            name="name"
            id="name"
            required
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label>
            <select
              className="browser-default custom-select"
              value={pessoaTipo}
              onChange={(e) => {
                setPessoaTipo(e.target.value);
              }}
            >
              <option checked value="cpf">
                Pessoa Física
              </option>
              <option value="cnpj">Pessoa Jurídica</option>
            </select>
          </label>
          <NumberFormat
            className="form-control"
            format={
              pessoaTipo === "cpf" ? "###.###.###-##" : "##.###.###/####-##"
            }
            allowEmptyFormatting
            mask="_"
            required
            value={pessoaTipo === "cpf" ? pessoaCPF : pessoaCNPJ}
            onChange={(e) =>
              pessoaTipo === "cpf"
                ? setPessoaCPF(e.target.value)
                : setPessoaCNPJ(e.target.value)
            }
          />
        </div>
        <div className="input-block">
          <label>E-mail</label>
          <input
            className="form-control"
            maxLength="50"
            name="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label>Telefone</label>
          <NumberFormat
            className="form-control"
            format="(##) # ####-####"
            allowEmptyFormatting
            mask="_"
            name="phone"
            id="phone"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label>Status</label>
          <div className="radio-inline">
            <label className="container">
              Ativo
              <input
                type="radio"
                name="radio"
                value="1"
                checked={status === "1"}
                onChange={(e) => setStatus(e.target.value)}
              />
              <span className="checkmark"></span>
            </label>
            <label className="container">
              Desativo
              <input
                type="radio"
                name="radio"
                value="0"
                checked={status === "0"}
                onChange={(e) => setStatus(e.target.value)}
              />
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        <div className="input-block">
          {loadingComarca ? (
            <BatteryLoading
              style={{
                position: "absolute",
                width: 20,
                height: 8,
                BorderColor: "#333",
                BorderInlineAndColor: "#333",
                borderRightColor: "#333",
                marginLeft: 65,
                marginTop: 6,
              }}
            />
          ) : null}
          <label>
            Comarca
            <select
              className="browser-default custom-select"
              value={comarca}
              onChange={(e) => setComarca(e.target.value)}
            >
              <option value={0} disabled>
                Selecione
              </option>
              {renderComarcas()}
            </select>
          </label>
        </div>
        <div className="input-block">
          {loadingEspecialidade ? (
            <BatteryLoading
              style={{
                position: "absolute",
                width: 20,
                height: 8,
                BorderColor: "#333",
                BorderInlineAndColor: "#333",
                borderRightColor: "#333",
                marginLeft: 95,
                marginTop: 6,
              }}
            />
          ) : null}
          <label>
            Especialidade
            <select
              className="browser-default custom-select"
              value={especialidade}
              onChange={(e) => setEspecialidade(parseInt(e.target.value))}
            >
              <option value={0} disabled>
                Selecione
              </option>
              {renderEspecialidades()}
            </select>
          </label>
        </div>
        <div className="input-block">
          <label>Bairro</label>
          <input
            className="form-control"
            maxLength="20"
            name="district"
            id="district"
            required
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label>Rua</label>
          <input
            className="form-control"
            maxLength="20"
            name="street"
            id="street"
            required
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label>Número</label>
          <input
            className="form-control"
            type="number"
            maxLength="5"
            name="number"
            id="number"
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
      </div>
      {loadingSubmit ? (
        <MyModal
          display={loadingSubmit}
          modalTitle="Carregando"
          borderRadius={5}
          bg="cecece"
        >
          <Loading size={50} />
        </MyModal>
      ) : null}
      <button type="submit">Salvar</button>
    </form>
  );
}
