import mongoose, { Document, Schema } from 'mongoose';

export interface IDog extends Document {
  nome: string;
  raca: string;
  idade: number;
  peso: number;
  proprietario?: string;
  fotoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const DogSchema: Schema = new Schema(
  {
    nome: { type: String, required: true },
    raca: { type: String, required: true },
    idade: { type: Number, required: true },
    peso: { type: Number, required: true },
    proprietario: { type: String },
    fotoUrl: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IDog>('Dog', DogSchema);