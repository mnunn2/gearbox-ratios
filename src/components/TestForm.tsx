import { Form, Row, Col, Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { gearName } from "@/lib/data";
import { useState, ChangeEvent } from "react";
import { FormEvent } from "react";

export default function InternalRatioForm({
  manGearNum,
}: {
  manGearNum: number;
}) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.preventDefault();
    setValidated(true);
    console.log("form submitted");
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
        <Form.Label>Ratios as a single number 2.54</Form.Label>
        {[...Array(manGearNum - 1)].map((x, i) => {
          return (
            <Form.Group key={i} as={Col} md="5" controlId="basicInput">
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                  {gearName[i]}
                </InputGroup.Text>
                <Form.Control
                  type="text"
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
              placeholder="1"
              aria-describedby="inputGroupPrepend"
              disabled
            />
          </InputGroup>
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
      {/* <Form.Label>Ratios as a single number 2.54</Form.Label>
      {[...Array(manGearNum - 1)].map((x, i) => {
        return (
          <InputGroup key={i} className="mb-3">
            <InputGroup.Text className="foo" id="bar">
              {gearName[i]}
            </InputGroup.Text>
            <Form.Control type="email" placeholder="1 to 5" />
          </InputGroup>
        );
      })}
      <InputGroup className="mb-3">
        <InputGroup.Text id="foo">Top</InputGroup.Text>
        <Form.Control type="email" placeholder="1" readOnly />
      </InputGroup> */}
    </>
  );
}
