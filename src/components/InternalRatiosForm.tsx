"use client";
import { useState } from "react";
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
      {[...Array(manGearNum - 1)].map((x, i) => {
        return (
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">{gearName[i]}</InputGroup.Text>
            <Form.Control type="email" placeholder="name@example.com" />
          </InputGroup>
        );
      })}
      <InputGroup className="mb-3">
        <InputGroup.Text id="foo">Top</InputGroup.Text>
        <Form.Control type="email" placeholder="top" />
      </InputGroup>
    </>
  );
}
