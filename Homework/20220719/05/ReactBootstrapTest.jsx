// import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BsCreditCard2FrontFill } from 'react-icons/bs';

function ReactBootstrapTest() {
    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <h1>React Bootstrap</h1>
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="success">Success</Button>
                        <h1>React Icons</h1>
                        <Button variant="primary">
                            <BsCreditCard2FrontFill />
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ReactBootstrapTest;
