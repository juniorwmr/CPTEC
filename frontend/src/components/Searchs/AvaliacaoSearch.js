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
            Avaliações
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AvaliacaoSearch />
        </Modal.Body>
      </Modal>
    </>
  );
}

export function AvaliacaoSearch() {
  const [loading, setLoading] = useState(false);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [avaliacoes_total, setAvaliacoesTotal] = useState(0);

  useEffect(() => {
    async function SearchAvaliacoes() {
      setLoading(true);
      const { data } = await api.get(`/avaliacao/${page}`);
      setAvaliacoes(data[0]);
      setPages(data[1]);
      setAvaliacoesTotal(data[2]);
      setLoading(false);
    }
    SearchAvaliacoes();
  }, [page]);

  function renderAvaliacoes() {
    try {
      return avaliacoes.map((avaliacao, index) => (
        <tr key={index}>
          <td value={avaliacao.id}>{avaliacao.Pericia.numero_processo}</td>
          <td value={avaliacao.id}>{avaliacao.avaliacao}</td>
        </tr>
      ));
    } catch (e) {
      return <div>Não há avaliação cadastrada.</div>;
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
          {avaliacoes !== undefined && !loading ? (
            <tr>
              <th id="top" scope="col">
                Número do Processo
              </th>
              <th id="top" scope="col">
                Avaliação
              </th>
            </tr>
          ) : null}
          {loading ? <DisappearedLoading /> : renderAvaliacoes()}
        </tbody>
      </table>
      {paginationBasic()}
      {avaliacoes_total ? (
        <span id="registro">{avaliacoes_total} registros</span>
      ) : null}
    </div>
  );
}
