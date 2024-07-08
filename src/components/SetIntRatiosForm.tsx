import { Form, Row, Col, Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { gearName } from "@/lib/data";
import { Ratios } from "@/lib/defs";
import { useState, FormEvent } from "react";

export default function InternalRatioForm({
  manGearNum,
  setIntRatiosForm,
}: {
  manGearNum: number;
  setIntRatiosForm: (ratios: Ratios) => void;
}) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    // TODO: "remove console.log";
    console.log("form", form);
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.preventDefault();
    setValidated(true);
    if (form.checkValidity() === true) {
      let intRatios: Ratios = [];
      const formData = new FormData(e.target as HTMLFormElement);
      for (let [key, value] of formData.entries()) {
        intRatios.push(parseFloat(value as string));
      }
      intRatios.push(1);
      setIntRatiosForm(intRatios);
    }
  };

  return (
    <>
      <style type="text/css">
        {`
    .input-group-text {
      background-color: grey;
      color: white;
      width: 5em;
    }
    `}
      </style>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Label>Ratios as a single number E.g 2.54</Form.Label>
        {[...Array(manGearNum - 1)].map((x, i) => {
          return (
            <Form.Group key={i} as={Col} md="5" controlId="basicInput">
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                  {gearName[i]}
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  min="1.01"
                  max="3.99"
                  step="0.01"
                  name={gearName[i]}
                  placeholder="Ratio"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter a number between 1 and 4
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          );
        })}
        <Form.Group as={Col} md="5" controlId="validationCustomUsername">
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">Top</InputGroup.Text>
            <Form.Control
              type="text"
              name="top"
              placeholder="1"
              aria-describedby="inputGroupPrepend"
              disabled
            />
          </InputGroup>
        </Form.Group>
        <Button type="submit">Update</Button>
      </Form>
    </>
  );
}
