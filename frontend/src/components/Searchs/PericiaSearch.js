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
            Pericias
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PericiaSearch />
        </Modal.Body>
      </Modal>
    </>
  );
}

export function PericiaSearch() {
  const [loading, setLoading] = useState(false);
  const [pericias, setPericias] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [pericias_total, setPericiasTotal] = useState(0);

  useEffect(() => {
    async function SearchPericias() {
      setLoading(true);
      const { data } = await api.get(`/pericia/${page}`);
      setPericias(data[0]);
      setPages(data[1]);
      setPericiasTotal(data[2]);
      setLoading(false);
    }
    SearchPericias();
  }, [page]);

  function renderPericias() {
    try {
      return pericias.map((pericia, index) => (
        <tr key={index}>
          <td value={pericia.id}>{pericia.numero_processo}</td>
          <td value={pericia.id}>{pericia.date}</td>
          <td value={pericia.id}>{pericia.honorarios}</td>
        </tr>
      ));
    } catch (e) {
      return <div>Nâo há perícia cadastrada.</div>;
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
          {!loading && pericias !== undefined ? (
            <tr>
              <th id="top" scope="col">
                Número do Processo
              </th>
              <th id="top" scope="col">
                Data
              </th>
              <th id="top" scope="col">
                Honorários
              </th>
            </tr>
          ) : null}
          {loading ? <DisappearedLoading /> : renderPericias()}
        </tbody>
      </table>
      {paginationBasic()}
      {pericias_total ? (
        <span id="registro">{pericias_total} registros</span>
      ) : null}
    </div>
  );
}
