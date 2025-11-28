import pool from "../db";
import { Request, Response } from "express";
import axios from "axios";

/**
 * ENDPOINT: GET /dogs/random
 * Descrição: Busca uma imagem aleatória de cachorro
 * Exemplo: GET http://localhost:3000/dogs/random
 */
export const getRandomDog = async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    
    res.json({
      success: true,
      data: {
        image_url: response.data.message,
        status: response.data.status
      }
    });
  } catch (error) {
    console.error('Erro ao buscar cachorro aleatório:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao buscar cachorro aleatório' 
    });
  }
};

/**
 * ENDPOINT: GET /dogs/breed/:breed
 * Descrição: Busca imagens de cachorros de uma raça específica
 * Parâmetros: breed (string) - nome da raça do cachorro
 * Exemplo: GET http://localhost:3000/dogs/breed/husky
 */
export const getBreedDog = async (req: Request, res: Response) => {
  try {
    const { breed } = req.params;
    
    if (!breed) {
      return res.status(400).json({
        success: false,
        error: 'Parâmetro breed é obrigatório'
      });
    }

    // Busca lista de imagens da raça específica
    const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images`);
    
    res.json({
      success: true,
      data: {
        breed: breed,
        images: response.data.message,
        count: response.data.message.length,
        status: response.data.status
      }
    });
  } catch (error) {
    console.error('Erro ao buscar cachorros da raça:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao buscar cachorros da raça ou raça não encontrada' 
    });
  }
};

/**
 * ENDPOINT: POST /dogs/favorite
 * Descrição: Salva um cachorro como favorito no banco de dados
 * Body (JSON): { name: string, breed: string, image_url: string }
 * Exemplo: POST http://localhost:3000/dogs/favorite
 * Body: { "name": "Buddy", "breed": "Golden Retriever", "image_url": "https://..." }
 */
export const saveFavoriteDog = async (req: Request, res: Response) => {
  try {
    const { name, breed, image_url } = req.body;

    // Validação dos campos obrigatórios
    if (!name || !breed || !image_url) {
      return res.status(400).json({
        success: false,
        error: 'Campos name, breed e image_url são obrigatórios'
      });
    }

    console.log("Dados recebidos:", req.body);

    const result = await pool.query(
      'INSERT INTO public.favorite_dogs (name, breed, image_url) VALUES ($1, $2, $3) RETURNING *', 
      [name, breed, image_url]
    );
    
    console.log("Resultado do INSERT:", result.rows[0]);
    
    res.status(201).json({
      success: true,
      message: 'Cachorro favorito salvo com sucesso!',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Erro ao salvar cachorro favorito:', err);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao salvar cachorro favorito' 
    });
  }
};

/**
 * ENDPOINT: GET /dogs/favorites
 * Descrição: Lista todos os cachorros favoritos salvos
 * Exemplo: GET http://localhost:3000/dogs/favorites
 */
export const getFavoriteDogs = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM public.favorite_dogs ORDER BY create_at DESC'
    );
    
    res.json({
      success: true,
      data: {
        favorites: result.rows,
        count: result.rows.length
      }
    });
  } catch (err) {
    console.error('Erro ao buscar cachorros favoritos:', err);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao buscar cachorros favoritos' 
    });
  }
};
