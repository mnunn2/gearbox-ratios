import Container from "react-bootstrap/Container";
import GbRatios from "@/components/gbRatios";

export default function Home() {
  return (
    <Container className="p-5 mb-4 bg-light rounded-3">
      <GbRatios />
    </Container>
  );
}
