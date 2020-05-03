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
            Documentos
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DocumentoSearch />
        </Modal.Body>
      </Modal>
    </>
  );
}

export function DocumentoSearch() {
  const [loading, setLoading] = useState(false);
  const [peritos, setPeritos] = useState([]);
  const [perito, setPerito] = useState(0);
  const [documentos, setDocumentos] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [documentos_total, setDocumentosTotal] = useState(0);

  useEffect(() => {
    async function SearchPeritos() {
      const { data } = await api.get("/perito");
      setPeritos(data);
    }
    async function SearchDocumentos() {
      setLoading(true);
      const { data } = await api.get(`/documento/${perito}/${page}`);
      setDocumentos(data[0]);
      setPages(data[1]);
      setDocumentosTotal(data[2]);
      setLoading(false);
    }
    SearchPeritos();
    SearchDocumentos();
  }, [perito, page]);

  function renderPeritos() {
    return peritos.map((perito, index) => (
      <option key={index} value={perito.id}>
        {perito.name}
      </option>
    ));
  }

  function renderDocumentos() {
    return documentos
      ? documentos.map((documento, index) => (
          <tr key={index}>
            <td value={documento.id}>{documento.description}</td>
            <td value={documento.id}>
              {documento.Tipo_documento.tipo_documento}
            </td>
          </tr>
        ))
      : null;
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
      <div style={{ marginBottom: "15px" }} className="input-group">
        <div className="input-block">
          <label>Selecione o Perito:</label>
          <select
            value={perito}
            onChange={(e) => setPerito(e.target.value)}
            className="form-control"
          >
            <option value={0} disabled>
              Selecione
            </option>
            {renderPeritos()}
          </select>
        </div>
      </div>
      <table className="show-peritos">
        <tbody>
          {documentos_total ? (
            <tr>
              <th id="top" scope="col">
                Documento
              </th>
              <th id="top" scope="col">
                Tipo de Documento
              </th>
            </tr>
          ) : null}
          {loading ? <DisappearedLoading /> : renderDocumentos()}
        </tbody>
      </table>
      {paginationBasic()}
      {documentos_total ? (
        <span id="registro">{documentos_total} registros</span>
      ) : null}
    </div>
  );
}
