import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Sidebar = () => {
    return (
        <div className="d-flex flex-column vh-100 bg-light">
            <Nav className="flex-column">
                <LinkContainer to="/dashboard">
                    <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/movies">
                    <Nav.Link>Movies</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/tickets">
                    <Nav.Link>Tickets</Nav.Link>
                </LinkContainer>
            </Nav>
        </div>
    );
};

export default Sidebar;
