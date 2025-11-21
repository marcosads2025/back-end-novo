import mongoose from 'mongoose';

const DogSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: true 
  },
  raca: { 
    type: String, 
    required: true 
  },
  idade: { 
    type: Number, 
    required: true 
  },
  // Campos opcionais que vimos no Controller:
  peso: { 
    type: Number 
  },
  proprietario: { 
    type: String 
  },
  description: { 
    type: String 
  },
  // IMPORTANTE: No controller chamamos de 'fotoUrl', aqui tem que ser igual
  fotoUrl: { 
    type: String 
  }
}, {
  timestamps: true // Cria automaticamente createdAt e updatedAt
});

export default mongoose.model('Dog', DogSchema);
