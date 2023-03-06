import mongoose, { Schema } from 'mongoose';

const localizedStringSchema = new Schema(
  {
    value: { type: String, required: true },
    language: { type: String, required: true },
  },
  { _id: false }
);

const contactSchema = new Schema({
  name: { type: String, required: true },
  phones: [{ type: String, required: true }],
  email: { type: String, required: true },
  categoryKey: { type: String, required: true },
  category: [localizedStringSchema],
  placeKey: { type: String },
  place: [localizedStringSchema],
  descriptionKey: { type: String },
  description: [localizedStringSchema],
  language: { type: String, required: true },
  states: [{ type: String, required: true }],
  country: { type: String },
});

const Contact = mongoose.model('contact', contactSchema, 'contacts');

export default Contact;
