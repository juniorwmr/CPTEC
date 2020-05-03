import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "semantic-ui-react";
import Pagination from "react-bootstrap/Pagination";
import { DisappearedLoading } from "react-loadingg";

import api from "../../services/api";

export default function Form() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button className="ButtonOpenRegister" onClick={() => setShow(true)}>
        Pesquisar
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
            Peritos
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PeritoSearch />
        </Modal.Body>
      </Modal>
    </>
  );
}

export function PeritoSearch() {
  const [loading, setLoading] = useState(false);
  const [peritos, setPeritos] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [peritos_total, setPeritosTotal] = useState(0);

  useEffect(() => {
    async function SearchPeritos() {
      setLoading(true);
      const { data } = await api.get(`/perito/${page}`);
      setPeritos(data[0]);
      setPages(data[1]);
      setPeritosTotal(data[2]);
      setLoading(false);
    }
    SearchPeritos();
  }, [page]);

  function renderPeritos() {
    try {
      return peritos.map((perito, index) => (
        <tr key={index}>
          <td value={perito.id}>{perito.name}</td>
          <td id="person" data-content={perito.cpf ? perito.cpf : perito.cnpj}>
            {perito.cpf ? "Pessoa Física" : "Pessoa Jurídica"}
          </td>

          <td value={perito.id}>{perito.email}</td>
          <td value={perito.id}>{perito.phone}</td>
          <td value={perito.id}>{perito.status ? "Sim" : "Nâo"}</td>
        </tr>
      ));
    } catch (e) {
      return <div>Não há perito cadastrado.</div>;
    }
  }

  // Pagination
  let active = page;
  let items = [];
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        onClick={(e) => PaginateClick(e)}
        key={number}
        name={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  function PaginateClick(e) {
    setPage(parseInt(e.target.name));
  }

  const paginationBasic = () => (
    <div>
      <Pagination size="sm">{items}</Pagination>
    </div>
  );

  return (
    <div>
      <table className="show-peritos">
        <tbody>
          {peritos !== undefined && !loading ? (
            <tr>
              <th id="top" scope="col">
                Nome
              </th>
              <th id="top" scope="col">
                Tipo de Pessoa
              </th>
              <th id="top" scope="col">
                E-mail
              </th>
              <th id="top" scope="col">
                Telefone
              </th>
              <th id="top" scope="col">
                Ativo
              </th>
            </tr>
          ) : null}
          {loading ? null : renderPeritos()}
        </tbody>
      </table>

      {loading ? <DisappearedLoading /> : null}
      {paginationBasic()}
      {peritos_total ? (
        <span id="registro">{peritos_total} registros</span>
      ) : null}
    </div>
  );
}
