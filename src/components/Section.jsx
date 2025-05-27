import { Container } from 'react-bootstrap';

const Section = ({ title, children }) => (
  <section className="my-4">
    <Container>
      {title && <h2>{title}</h2>}
      {children}
    </Container>
  </section>
);

export default Section;
