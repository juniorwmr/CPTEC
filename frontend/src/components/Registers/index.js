import React from "react";
import PeritoRegister from "./PeritoRegister";
import ComarcaRegister from "./ComarcaRegister";
import EspecialidadeRegister from "./EspecialidadeRegister";
import PericiaRegister from "./PericiaRegister";
import DocumentoRegister from "./DocumentoRegister";
import TipoDocRegister from "./TipoDocRegister";
import MagistradoRegister from "./MagistradoRegister";
import AvaliacaoRegister from "./AvaliacaoRegister";

export default function index() {
  return (
    <section className="section-register">
      <div className="item-register">
        <strong>Perito</strong>
        <PeritoRegister name="Perito" />
      </div>
      <div className="item-register">
        <strong>Comarca</strong>
        <ComarcaRegister name="Comarca" />
      </div>
      <div className="item-register">
        <strong>Especialidade</strong>
        <EspecialidadeRegister name="Especialidade" />
      </div>
      <div className="item-register">
        <strong>Perícia</strong>
        <PericiaRegister name="Perícia" />
        {/* Form */}
      </div>
      <div className="item-register">
        <strong>Documento</strong>
        <DocumentoRegister name="Documento" />
        {/* Form */}
      </div>
      <div className="item-register">
        <strong>Tipo de Documento</strong>
        <TipoDocRegister name="Documento" />
        {/* Form */}
      </div>
      <div className="item-register">
        <strong>Magistrado</strong>
        <MagistradoRegister name="Magistrado" />
        {/* Form */}
      </div>
      <div className="item-register">
        <strong>Avaliação</strong>
        <AvaliacaoRegister name="Avaliação" />
        {/* Form */}
      </div>
    </section>
  );
}
