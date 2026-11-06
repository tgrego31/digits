'use client';

import type { Contact } from '@prisma/client';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editContact } from '@/lib/dbActions';
import { EditContactSchema } from '@/lib/validationSchemas';

const EditContactForm = ({ contact }: { contact: Contact }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Contact>({
    resolver: yupResolver(EditContactSchema),
    defaultValues: {
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      image: contact.image,
      description: contact.description,
      owner: contact.owner,
    },
  });

  const onSubmit = async (data: Contact) => {
    await editContact(data);
  };

  return (
    <Container className="py-2">
      <Row className="justify-content-center">
        <Col xs={10}>
          <h2 className="text-center">Edit Contact</h2>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('id', { valueAsNumber: true })} />
                <input type="hidden" {...register('owner')} />
                <Row className="g-2">
                  <Col md={6}>
                    <Form.Group controlId="editFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={contact.firstName}
                        {...register('firstName')}
                        isInvalid={!!errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">{errors.firstName?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="editLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={contact.lastName}
                        {...register('lastName')}
                        isInvalid={!!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">{errors.lastName?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="editAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={contact.address}
                        {...register('address')}
                        isInvalid={!!errors.address}
                      />
                      <Form.Control.Feedback type="invalid">{errors.address?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="editImage">
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={contact.image}
                        {...register('image')}
                        isInvalid={!!errors.image}
                      />
                      <Form.Control.Feedback type="invalid">{errors.image?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group controlId="editDescription">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        defaultValue={contact.description}
                        {...register('description')}
                        isInvalid={!!errors.description}
                      />
                      <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="pt-3">
                  <Col>
                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                      Submit
                    </Button>
                  </Col>
                  <Col>
                    <Button type="button" variant="warning" onClick={() => reset()}>
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditContactForm;
