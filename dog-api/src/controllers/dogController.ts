import { Request, Response } from 'express';
import Dog, { IDog } from '../models/Dog.js';

/**
 * GET /dogs
 */
export const getAllDogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const dogs = await Dog.find();
    res.status(200).json(dogs);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cachorros', error });
  }
};

/**
 * GET /dogs/:id
 */
export const getDogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) {
      res.status(404).json({ message: 'Cachorro não encontrado' });
      return;
    }
    res.status(200).json(dog);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cachorro', error });
  }
};

/**
 * POST /dogs — Criar cachorro com foto
 */
export const createDog = async (req: Request, res: Response): Promise<void> => {
  try {
    const filename = (req as any).file?.filename || null;

    // Campos enviados pelo React
    const { nome, raca, peso, idade, proprietario } = req.body as any;

    if (!nome || !raca || !peso || !idade || !proprietario || !filename) {
      res.status(400).json({
        message: 'Todos os campos são obrigatórios (nome, raca, peso, idade, proprietario, foto)',
      });
      return;
    }

    // URL pública da imagem
    const fotoUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;

    const newDog = new Dog({
      nome,
      raca,
      peso: Number(peso),
      idade: Number(idade),
      proprietario,
      fotoUrl,
    });

    const savedDog = await newDog.save();

    res.status(201).json(savedDog);
  } catch (error) {
    console.error('Erro ao criar cachorro:', error);
    res.status(500).json({ message: 'Erro ao criar cachorro', error });
  }
};

/**
 * PUT /dogs/:id — Atualizar cachorro (opcionalmente a foto)
 */
export const updateDog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, raca, peso, idade, proprietario } = req.body as any;
    const filename = (req as any).file?.filename || null;

    const updateData: Partial<IDog> = {};

    if (nome) updateData.nome = nome;
    if (raca) updateData.raca = raca;
    if (peso) updateData.peso = Number(peso);
    if (idade) updateData.idade = Number(idade);
    if (proprietario) updateData.proprietario = proprietario;

    if (filename) {
      updateData.fotoUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
    }

    const updatedDog = await Dog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updatedDog) {
      res.status(404).json({ message: 'Cachorro não encontrado' });
      return;
    }

    res.status(200).json(updatedDog);
  } catch (error) {
    console.error('Erro ao atualizar cachorro:', error);
    res.status(500).json({ message: 'Erro ao atualizar cachorro', error });
  }
};

/**
 * DELETE /dogs/:id
 */
export const deleteDog = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedDog = await Dog.findByIdAndDelete(req.params.id);

    if (!deletedDog) {
      res.status(404).json({ message: 'Cachorro não encontrado' });
      return;
    }

    res.status(200).json({ message: 'Cachorro excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir cachorro', error });
  }
};
