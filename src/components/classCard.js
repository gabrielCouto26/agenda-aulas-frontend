import Card from 'react-bootstrap/Card';

export default function ClassCard({ name, subject }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{ name }</Card.Title>
        {/* <Card.Subtitle className="mb-2 text-muted">{ subject }</Card.Subtitle> */}
        <Card.Link href="#">Ver detalhes</Card.Link>
      </Card.Body>
    </Card>
  );
}