import { Router } from "express";
import { getRandomDog, getBreedDog, saveFavoriteDog, getFavoriteDogs } from "../controllers/dogsController";

const router = Router();

// ================================
// ENDPOINTS DA API DE CACHORROS
// ================================

/**
 * GET /dogs/random
 * Busca uma imagem aleatória de cachorro
 * Resposta: { success: boolean, data: { image_url: string, status: string } }
 */
router.get("/random", getRandomDog);

/**
 * GET /dogs/breed/:breed
 * Busca imagens de cachorros de uma raça específica
 * Parâmetros: breed (string) - nome da raça
 * Resposta: { success: boolean, data: { breed: string, images: string[], count: number, status: string } }
 */
router.get("/breed/:breed", getBreedDog);

/**
 * POST /dogs/favorite
 * Salva um cachorro como favorito no banco de dados
 * Body: { name: string, breed: string, image_url: string }
 * Resposta: { success: boolean, message: string, data: object }
 */
router.post("/favorite", saveFavoriteDog);

/**
 * GET /dogs/favorites
 * Lista todos os cachorros favoritos salvos
 * Resposta: { success: boolean, data: { favorites: array, count: number } }
 */
router.get("/favorites", getFavoriteDogs);

export default router;
