import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

import api from "../../services/api";

export default function Forms() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        className="ButtonOpenRegister typedoc"
        onClick={() => setShow(true)}
      >
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
            Tipo de Documento
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TipoDocRegister />
        </Modal.Body>
      </Modal>
    </>
  );
}

export function TipoDocRegister() {
  const success = () => toast.success("Cadastrado com sucesso!");
  const error = () => toast.error("Tente novamente!");

  const SignupSchema = Yup.object().shape({
    tipo_documento: Yup.string()
      .min(2, "Nome muito curto!")
      .max(15, "Nome muito longo!")
      .required("*campo obrigatório"),
  });

  return (
    <div className="form-register">
      <Formik
        initialValues={{
          tipo_documento: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          try {
            const response = await api.post("/tipo_documento", {
              tipo_documento: values.tipo_documento,
            });

            if (response.status === 200) {
              success();
            }
          } catch (e) {
            error();
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="input-group">
              <div className="input-block">
                <label>Tipo de Documento</label>
                {errors.tipo_documento && touched.tipo_documento ? (
                  <div className="box-error">
                    <span>{errors.tipo_documento}</span>
                  </div>
                ) : null}
                <Field
                  name="tipo_documento"
                  className={
                    errors.tipo_documento && touched.tipo_documento
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  required
                />
              </div>
            </div>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
