import { Badge, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

const MiniCart = ({ count, toggleCart }) => {
    return (
        <div className="container">
            
            <Button variant="light" onClick={toggleCart} style={{ position: 'fixed', top: 130, right: 70 }}>
                <FaShoppingCart size={24} />
                <Badge bg="danger" pill style={{ position: 'absolute', top: 0, right: 0 }}>
                    {count}
                </Badge>
            </Button>
        </div>
    );
};

export default MiniCart;