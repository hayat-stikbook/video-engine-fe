import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { useState } from "react";
import { submitVideo } from "@/lib/actions";
import { useAtom } from "jotai";
import { resultAtom } from "@/store";

export default function Home() {
  const [video, setVideo] = useState(null);
  const [data, setData] = useAtom(resultAtom)

  const handleFileChange = (event) => {
    setVideo(event.target.files[0]);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setData(await submitVideo(video));

  }

  return (
    <>
      <br />
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Enter your video here</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
        <br />
        <Table>
          <thead>
            <tr>
              <th>Object</th>
              <th>Occurences</th>
            </tr>
          </thead>
          <tbody>
            {data && Object.keys(data.result).map((key) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{data.result[key]}</td>
                    </tr>
                  ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
