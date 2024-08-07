import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import GbRatios from "@/components/gbRatios";
import { getSheetData } from "@/lib/googleData";

const gearData = await getSheetData();

export default function Home() {
  return (
    <Container className="p-5 mb-4 bg-light rounded-3">
      <GbRatios gearData={gearData} />
      <Navbar sticky="bottom" expand="lg" className="bg-body-tertiary">
        <Container>
          <span className="text-start">
            Feedback welcome:{" "}
            <a href="mailto: mswibble@gmail.com">mswibble@gmail.com</a>
          </span>
          <span className="text-start"></span>
          Copyright &copy; 2024 F86
        </Container>
      </Navbar>
    </Container>
  );
}
