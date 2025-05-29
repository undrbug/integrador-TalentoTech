import React from 'react';
import { Card } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <div>
      <Card className="mt-5">
        <Card.Header>
          <Card.Title>Panel de Control</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>Bienvenido al panel de control. Aquí puedes gestionar tu aplicación.</p>
        </Card.Body>
        <Card.Footer>
          <p>© 2023 Tu Empresa</p>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Dashboard;
