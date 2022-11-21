import Card from 'react-bootstrap/Card';

export default function ClassCard({ id, name, href }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{ name }</Card.Title>
        <Card.Link href={`/${href}/${id}/details`}>Ver detalhes</Card.Link>
      </Card.Body>
    </Card>
  );
}