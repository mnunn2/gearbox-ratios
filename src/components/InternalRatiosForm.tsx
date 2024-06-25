import { Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { gearName } from "@/lib/data";

export default function InternalRatioForm({
  manGearNum,
}: {
  manGearNum: number;
}) {
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
      <Form.Label>Ratios as a single number 2.54</Form.Label>
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
      </InputGroup>
    </>
  );
}
