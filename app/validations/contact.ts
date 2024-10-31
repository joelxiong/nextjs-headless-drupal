import { object, string } from 'yup';

export const contactFormSchema = object({
  name: string().required(),
  company: string().required(),
  email: string().email(),
  subject: string().required(),
  message: string().required(),
});