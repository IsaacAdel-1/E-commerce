import { Card, Row, Col, Button } from 'react-bootstrap'; // ✅ imports موجودين

export const AddressCard = ({ address, onSetDefault }) => {
  return (
    <Card className="shadow-sm border-primary mb-3" style={{ maxWidth: '400px' }}>

      <Card.Header className="bg-primary text-white">
        <Row className="align-items-center">
          <Col>{address.fullName}</Col>
          <Col className="text-end">
            {/* TODO: ربط Edit بفورم التعديل */}
            <Button variant="light" size="sm">Edit</Button>
          </Col>
        </Row>
      </Card.Header>

      <Card.Body>
        <Card.Text as="div">
          <div><strong>Phone:</strong> {address.phone}</div>
          <hr />
          <div>{address.address1}</div>
          {address.address2 && <div>{address.address2}</div>}
          {/* ✅ postal مش postalCode — يتطابق مع الـ state في الفورم */}
          <div>{address.city}{address.state ? `, ${address.state}` : ""}</div>
          <div>{address.postal}, {address.country}</div>
          {address.notes && (
            <div className="mt-2 text-muted"><small>📝 {address.notes}</small></div>
          )}
        </Card.Text>

        {!address.defaultAddress && (
          <Button
            variant="outline-primary"
            className="mt-2 w-100"
            onClick={() => onSetDefault?.(address._id)}
          >
            Set as Default
          </Button>
        )}

        {address.defaultAddress && (
          <div className="mt-2 text-center text-success">
            <small>✅ Default Address</small>
          </div>
        )}
      </Card.Body>

    </Card>
  );
};
