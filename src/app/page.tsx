import Container from "react-bootstrap/Container";
import InternalRatio from "@/components/internalRatio";

export default function Home() {
  return (
    <Container className="p-5 mb-4 bg-light rounded-3">
      <h1 className="header">Gearbox Ratios</h1>
      <InternalRatio />
      <InternalRatio />
    </Container>
  );
}
