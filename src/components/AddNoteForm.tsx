'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { addNote } from '@/lib/dbActions';
import { AddNoteSchema } from '@/lib/validationSchemas';

type AddNoteValues = {
  note: string;
  contactId: number;
  owner: string;
};

const AddNoteForm = ({ contactId }: { contactId: number }) => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddNoteValues>({
    resolver: yupResolver(AddNoteSchema),
    defaultValues: { note: '', contactId, owner: '' },
  });

  useEffect(() => {
    setValue('owner', session?.user?.email ?? '');
  }, [session?.user?.email, setValue]);

  const onSubmit = async (values: AddNoteValues) => {
    await addNote(values);
  };

  return (
    <Card className="mt-3">
      <Card.Header className="text-center py-2">Add Timestamped Note</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register('contactId', { valueAsNumber: true })} />
          <input type="hidden" {...register('owner')} />
          <Form.Group controlId={`note-${contactId}`}>
            <Form.Label>Note</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              {...register('note')}
              isInvalid={!!errors.note}
            />
            <Form.Control.Feedback type="invalid">{errors.note?.message}</Form.Control.Feedback>
          </Form.Group>
          <Row className="mt-2">
            <Col>
              <Button type="submit" size="sm" disabled={isSubmitting || !session?.user?.email}>
                Submit
              </Button>
            </Col>
            <Col>
              <Button type="button" variant="warning" size="sm" onClick={() => reset({ note: '', contactId, owner: session?.user?.email ?? '' })}>
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddNoteForm;
