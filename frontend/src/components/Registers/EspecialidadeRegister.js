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
      <Button className="ButtonOpenRegister" onClick={() => setShow(true)}>
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
            Especialidade
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EspecialidadeRegister />
        </Modal.Body>
      </Modal>
    </>
  );
}

export function EspecialidadeRegister() {
  const success = () => toast.success("Cadastrado com sucesso!");
  const error = () => toast.error("Tente novamente!");

  const SignupSchema = Yup.object().shape({
    especialidade: Yup.string()
      .min(2, "nome muito curto")
      .max(10, "nome muito longo")
      .required("campo obrigatório"),
  });

  return (
    <div className="form-register">
      <Formik
        initialValues={{
          especialidade: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          try {
            const response = await api.post("/especialidade", {
              especialidade: values.especialidade,
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
                <label>Especialidade</label>
                {errors.especialidade && touched.especialidade ? (
                  <div className="box-error">
                    <span>{errors.especialidade}</span>
                  </div>
                ) : null}
                <Field
                  name="especialidade"
                  className={
                    errors.especialidade && touched.especialidade
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
