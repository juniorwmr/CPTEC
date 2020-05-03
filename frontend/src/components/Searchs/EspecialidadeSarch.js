import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
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
            Especialidades
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EspecialidadeSearch />
        </Modal.Body>
      </Modal>
    </>
  );
}

export function EspecialidadeSearch() {
  const [loading, setLoading] = useState(false);
  const [especialidades, setEspecialidades] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [especialidades_total, setEspecialidadesTotal] = useState(0);

  useEffect(() => {
    async function searchEspecialidades() {
      setLoading(true);
      const { data } = await api.get(`/especialidade/${page}`);
      setEspecialidades(data[0]);
      setPages(data[1]);
      setEspecialidadesTotal(data[2]);
      setLoading(false);
    }
    searchEspecialidades();
  }, [page]);

  function renderEspecialidades() {
    try {
      return especialidades.map((especialidade, index) => (
        <tr key={index}>
          <td value={especialidade.id}>{especialidade.especialidade}</td>
        </tr>
      ));
    } catch (e) {
      return <div>Não há especialidade cadastrada.</div>;
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
          {!loading && especialidades !== undefined ? (
            <tr>
              <th id="top" scope="col">
                Especialidade
              </th>
            </tr>
          ) : null}
          {loading ? <DisappearedLoading /> : renderEspecialidades()}
        </tbody>
      </table>
      {paginationBasic()}
      {especialidades_total ? (
        <span>{especialidades_total} registros</span>
      ) : null}
    </div>
  );
}
