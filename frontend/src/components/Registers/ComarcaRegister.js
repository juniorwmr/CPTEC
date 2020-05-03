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
            Comarca
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ComarcaRegister />
        </Modal.Body>
      </Modal>
    </>
  );
}

export function ComarcaRegister() {
  const success = () => toast.success("Cadastrado com sucesso!");
  const error = () => toast.error("Tente novamente!");

  const SignupSchema = Yup.object().shape({
    comarca: Yup.string()
      .min(2, "Nome muito curto!")
      .max(15, "Nome muito longo!")
      .required("*campo obrigatório"),
  });

  return (
    <div className="form-register">
      <Formik
        initialValues={{
          comarca: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          try {
            const response = await api.post("/comarca", {
              comarca: values.comarca,
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
                <label>Comarca</label>
                {errors.comarca && touched.comarca ? (
                  <div className="box-error">
                    <span>{errors.comarca}</span>
                  </div>
                ) : null}
                <Field
                  name="comarca"
                  className={
                    errors.comarca && touched.comarca
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
