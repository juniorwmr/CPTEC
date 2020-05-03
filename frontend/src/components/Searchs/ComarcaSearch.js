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
            Comarcas
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ComarcaSearch />
        </Modal.Body>
      </Modal>
    </>
  );
}

export function ComarcaSearch() {
  const [loading, setLoading] = useState(false);
  const [comarcas, setComarcas] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [comarcas_total, setComarcasTotal] = useState(0);

  useEffect(() => {
    async function SearchComarcas() {
      setLoading(true);
      const { data } = await api.get(`/comarca/${page}`);
      setComarcas(data[0]);
      setPages(data[1]);
      setComarcasTotal(data[2]);
      setLoading(false);
    }
    SearchComarcas();
  }, [page]);

  function renderComarcas() {
    try {
      return comarcas.map((comarca, index) => (
        <tr key={index}>
          <td value={comarca.id}>{comarca.comarca}</td>
        </tr>
      ));
    } catch (e) {
      return <div>Nâo há comarca cadastrada.</div>;
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
          {!loading ? (
            <tr>
              <th id="top" scope="col">
                Comarca
              </th>
            </tr>
          ) : null}
          {loading ? <DisappearedLoading /> : renderComarcas()}
        </tbody>
      </table>
      {paginationBasic()}
      {comarcas_total ? (
        <span id="registro">{comarcas_total} registros</span>
      ) : null}
    </div>
  );
}
