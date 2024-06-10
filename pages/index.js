import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { useState, useMemo } from "react";
import { submitVideo } from "@/lib/actions";
import { useAtom } from "jotai";
import { resultAtom } from "@/store";

export default function Home() {
  const [video, setVideo] = useState(null);
  const [data, setData] = useAtom(resultAtom)
  const [sortConfig, setSortConfig] = useState({ key: "Object", direction: "ascending" });


  const handleFileChange = (event) => {
    setVideo(event.target.files[0]);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setData(await submitVideo(video));
    console.log(data)
  }

  const handleSort = (column) => {
    let direction = "ascending";
    if (sortConfig.key === column && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: column, direction });
  };

  const getColumnIndex = (column) => {
    switch (column) {
      case "Object":
        return "key";
      case "Occurences":
        return 0;
      case "Sub-Category":
        return 1;
      case "Category":
        return 2;
      case "Confidence Rating":
        return 3;
      default:
        return 3;
    }
  };

  const sortedData = useMemo(() => {
    if (!data || !data.result) return [];
    const sortableItems = Object.entries(data.result).map(([key, value]) => ({ key, value }));
    sortableItems.sort((a, b) => {
      const index = getColumnIndex(sortConfig.key);
      const valueA = index === "key" ? a.key : a.value[index];
      const valueB = index === "key" ? b.key : b.value[index];

      if (valueA < valueB) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    return sortableItems;
  }, [data, sortConfig]);

  return (
    <>
      <br />
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Enter your post here</Form.Label>
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
              <th onClick={() => handleSort("Object")}>Object</th>
              <th onClick={() => handleSort("Occurences")}>Occurences</th>
              <th onClick={() => handleSort("Sub-Category")}>Sub-Category</th>
              <th onClick={() => handleSort("Category")}>Category</th>
              <th onClick={() => handleSort("Confidence Rating")}>Confidence Rating</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map(({ key, value }) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value[0]}</td>
                <td>{value[1]}</td>
                <td>{value[2]}</td>
                <td>{value[3]}%</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
