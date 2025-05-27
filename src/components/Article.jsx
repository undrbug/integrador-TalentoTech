import { Card } from 'react-bootstrap';

const Article = ({ title, content, image }) => (
  <article className="mb-3">
    <Card>
      {image && <Card.Img variant="top" src={image} />}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
    </Card>
  </article>
);

export default Article;
