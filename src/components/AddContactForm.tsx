'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addContact } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddContactSchema } from '@/lib/validationSchemas';

type AddContactValues = {
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
};

const AddContactForm = () => {
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddContactValues>({
    resolver: yupResolver(AddContactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      image: '',
      description: '',
    },
  });

  const onSubmit = async (data: AddContactValues) => {
    await addContact({ ...data, owner: session?.user?.email ?? '' });
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <Container className="py-2">
      <Row className="justify-content-center">
        <Col xs={10}>
          <h2 className="text-center">Add Contact</h2>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="g-2">
                  <Col md={6}>
                    <Form.Group controlId="addFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        {...register('firstName')}
                        isInvalid={!!errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">{errors.firstName?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="addLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        {...register('lastName')}
                        isInvalid={!!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">{errors.lastName?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="addAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        {...register('address')}
                        isInvalid={!!errors.address}
                      />
                      <Form.Control.Feedback type="invalid">{errors.address?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="addImage">
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type="text"
                        {...register('image')}
                        isInvalid={!!errors.image}
                      />
                      <Form.Control.Feedback type="invalid">{errors.image?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group controlId="addDescription">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
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

export default AddContactForm;
