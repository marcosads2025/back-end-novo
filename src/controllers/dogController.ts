import { Request, Response } from 'express';
import Dog from '../models/Dog'; // Se precisar da interface, importe { IDog } também

// Obter todos os cães
export const getAllDogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const dogs = await Dog.find();
    res.status(200).json(dogs);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cães', error });
  }
};

// Obter um cão pelo ID
export const getDogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) {
      res.status(404).json({ message: 'Cão não encontrado' });
      return;
    }
    res.status(200).json(dog);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cão', error });
  }
};

// Criar um novo cão (CORRIGIDO PARA SALVAR FOTO)
export const createDog = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Pegamos os dados de texto
    const { nome, raca, peso, idade, proprietario } = req.body;

    // 2. Verificamos se veio uma imagem
    let fotoUrl = '';
    
    if (req.file) {
      // AQUI ESTÁ O SEGREDO:
      // Salvamos apenas a pasta e o nome do arquivo. 
      // O frontend se encarrega de colocar "https://..." na frente.
      fotoUrl = `uploads/${req.file.filename}`;
    }

    // 3. Criamos o objeto juntando texto + foto
    const newDog = new Dog({
      nome,
      raca,
      peso,
      idade,
      proprietario,
      fotoUrl // Salva o caminho relativo (ex: uploads/cachorro123.jpg)
    });

    const savedDog = await newDog.save();
    res.status(201).json(savedDog);
  } catch (error) {
    console.error(error); // Log para ajudar no debug do Render
    res.status(400).json({ message: 'Erro ao criar cão', error });
  }
};

// Atualizar um cão (CORRIGIDO PARA ATUALIZAR FOTO TAMBÉM)
export const updateDog = async (req: Request, res: Response): Promise<void> => {
  try {
    // Cria um objeto com os dados que chegaram no corpo
    const updateData = { ...req.body };

    // Se o usuário enviou uma nova foto, atualizamos o campo fotoUrl
    if (req.file) {
      updateData.fotoUrl = `uploads/${req.file.filename}`;
    }

    const updatedDog = await Dog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedDog) {
      res.status(404).json({ message: 'Cão não encontrado' });
      return;
    }
    res.status(200).json(updatedDog);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar cão', error });
  }
};

// Excluir um cão
export const deleteDog = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedDog = await Dog.findByIdAndDelete(req.params.id);
    if (!deletedDog) {
      res.status(404).json({ message: 'Cão não encontrado' });
      return;
    }
    res.status(200).json({ message: 'Cão excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir cão', error });
  }
};
