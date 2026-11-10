import * as Yup from 'yup';


export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
  owner: string;
}

export const AddContactSchema = Yup.object({
  firstName: Yup.string().trim().required(),
  lastName: Yup.string().trim().required(),
  address: Yup.string().trim().required(),
  image: Yup.string().trim().required(),
  description: Yup.string().trim().required(),
});

export const EditContactSchema = AddContactSchema.shape({
  id: Yup.number().integer().positive().required(),
  owner: Yup.string().required(),
});

export const AddNoteSchema = Yup.object({
  note: Yup.string().trim().required(),
  contactId: Yup.number().integer().positive().required(),
  owner: Yup.string().email().required(),
});
