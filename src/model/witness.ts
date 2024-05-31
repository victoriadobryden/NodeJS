import { Schema, model, Document } from 'mongoose';

interface Witness extends Document {
  spravaId: Schema.Types.ObjectId;
  dateOfBirth: Date;
  name: string;
}

const witnessSchema = new Schema({
  spravaId: { type: Schema.Types.ObjectId, ref: 'Sprava', required: true },
  dateOfBirth: { type: Date, default: Date.now },
  name: { type: String, required: true },
});

export default model<Witness>('Witness', witnessSchema);
