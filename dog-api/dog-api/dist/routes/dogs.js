import { Router } from "express";
import { getRandomDog, getBreedDog, saveFavoriteDog, getFavoriteDogs } from "../controllers/dogsController";
const router = Router();
// ================================
// ENDPOINTS DA API DE CACHORROS
// ================================
/**
 * @swagger
 * /dogs/random:
 *   get:
 *     summary: Busca uma imagem aleatória de cachorro
 *     description: Retorna uma imagem aleatória de cachorro da API externa Dog CEO
 *     tags: [Dogs]
 *     responses:
 *       200:
 *         description: Imagem aleatória encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RandomDogResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/random", getRandomDog);
/**
 * @swagger
 * /dogs/breed/{breed}:
 *   get:
 *     summary: Busca imagens de cachorros de uma raça específica
 *     description: Retorna uma lista de imagens de cachorros da raça especificada
 *     tags: [Dogs]
 *     parameters:
 *       - in: path
 *         name: breed
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome da raça do cachorro (ex: husky, golden retriever, labrador)
 *         example: husky
 *     responses:
 *       200:
 *         description: Imagens da raça encontradas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BreedDogResponse'
 *       400:
 *         description: Parâmetro breed é obrigatório
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor ou raça não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/breed/:breed", getBreedDog);
/**
 * @swagger
 * /dogs/favorite:
 *   post:
 *     summary: Salva um cachorro como favorito
 *     description: Salva um cachorro como favorito no banco de dados local
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteDogRequest'
 *           examples:
 *             example1:
 *               summary: Exemplo de cachorro favorito
 *               value:
 *                 name: "Buddy"
 *                 breed: "Golden Retriever"
 *                 image_url: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1003.jpg"
 *     responses:
 *       201:
 *         description: Cachorro favorito salvo com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteDogResponse'
 *       400:
 *         description: Campos obrigatórios não fornecidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/favorite", saveFavoriteDog);
/**
 * @swagger
 * /dogs/favorites:
 *   get:
 *     summary: Lista todos os cachorros favoritos
 *     description: Retorna uma lista de todos os cachorros favoritos salvos no banco de dados
 *     tags: [Favorites]
 *     responses:
 *       200:
 *         description: Lista de favoritos encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoritesListResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/favorites", getFavoriteDogs);
export default router;
