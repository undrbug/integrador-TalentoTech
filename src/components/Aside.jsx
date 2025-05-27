import { Card } from 'react-bootstrap';

const Aside = ({ title, children }) => (
  <aside>
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {children}
      </Card.Body>
    </Card>
  </aside>
);

export default Aside;
