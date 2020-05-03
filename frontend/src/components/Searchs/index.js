import React from "react";
import PeritoSearch from "./PeritoSearch";
import ComarcaSearch from "./ComarcaSearch";
import EspecialidadeSarch from "./EspecialidadeSarch";
import PericiaSearch from "./PericiaSearch";
import DocumentoSearch from "./DocumentoSearch";
import AvaliacaoSearch from "./AvaliacaoSearch";
import MagistradoSearch from "./MagistradoSearch";

export default function index() {
  return (
    <section className="section-register">
      <div className="item-register">
        <strong>Perito</strong>
        <PeritoSearch />
      </div>
      <div className="item-register">
        <strong>Comarca</strong>
        <ComarcaSearch />
      </div>
      <div className="item-register">
        <strong>Especialidade</strong>
        <EspecialidadeSarch />
      </div>
      <div className="item-register">
        <strong>Perícia</strong>
        <PericiaSearch />
        {/* Form */}
      </div>
      <div className="item-register">
        <strong>Documento</strong>
        <DocumentoSearch />
        {/* Form */}
      </div>
      <div className="item-register">
        <strong>Avaliação</strong>
        <AvaliacaoSearch />
        {/* Form */}
      </div>
      <div className="item-register">
        <strong>Magistrado</strong>
        <MagistradoSearch />
        {/* Form */}
      </div>
    </section>
  );
}
