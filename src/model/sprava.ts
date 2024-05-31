import { Schema, model, Document } from 'mongoose';

interface Sprava extends Document {
  placeOfEvent: string;
  date: string;
  namesOfVictims: string[];
}

const spravaSchema = new Schema<Sprava>({
  placeOfEvent: { type: String, required: true },
  date: { type: String, required: true },
  namesOfVictims: { type: [String], required: true },
});

export default model<Sprava>('Sprava', spravaSchema);
