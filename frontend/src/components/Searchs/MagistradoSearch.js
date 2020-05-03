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
            Magistrados
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MagistradoSearch />
        </Modal.Body>
      </Modal>
    </>
  );
}

export function MagistradoSearch() {
  const [loading, setLoading] = useState(false);
  const [magistrados, setMagistrados] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [magistrados_total, setMagistradosTotal] = useState(0);

  useEffect(() => {
    async function SearchMagistrados() {
      setLoading(true);
      const { data } = await api.get(`/magistrado/${page}`);
      setMagistrados(data[0]);
      setPages(data[1]);
      setMagistradosTotal(data[2]);
      setLoading(false);
    }
    SearchMagistrados();
  }, [page]);

  function renderMagistrados() {
    try {
      return magistrados.map((magistrado, index) => (
        <tr key={index}>
          <td value={magistrado.id}>{magistrado.name}</td>
        </tr>
      ));
    } catch (e) {
      return <div>Nâo há magistrado cadastrado.</div>;
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
          {!loading && magistrados !== undefined ? (
            <tr>
              <th id="top" scope="col">
                Nome
              </th>
            </tr>
          ) : null}
          {loading ? <DisappearedLoading /> : renderMagistrados()}
        </tbody>
      </table>
      {paginationBasic()}
      {magistrados_total ? (
        <span id="registro">{magistrados_total} registros</span>
      ) : null}
    </div>
  );
}
