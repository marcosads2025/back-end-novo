import { Router } from 'express';
import { 
  getAllDogs, 
  getDogById, 
  createDog, 
  updateDog, 
  deleteDog 
} from '../controllers/dogController';
import { upload } from '../config/multer';

const router = Router();

/**
 * @swagger
 * /api/dogs:
 *   get:
 *     summary: Retorna todos os cachorros
 *     tags: [Dogs]
 *     responses:
 *       200:
 *         description: Lista de cachorros
 *       500:
 *         description: Erro no servidor
 */
router.get('/', getAllDogs);

/**
 * @swagger
 * /api/dogs/{id}:
 *   get:
 *     summary: Retorna um cachorro pelo ID
 *     tags: [Dogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do cachorro
 *     responses:
 *       200:
 *         description: Cachorro encontrado
 *       404:
 *         description: Cachorro não encontrado
 */
router.get('/:id', getDogById);

/**
 * @swagger
 * /api/dogs:
 *   post:
 *     summary: Cria um novo cachorro
 *     tags: [Dogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - breed
 *               - age
 *               - weight
 *             properties:
 *               name:
 *                 type: string
 *               breed:
 *                 type: string
 *               age:
 *                 type: number
 *               weight:
 *                 type: number
 *               owner:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cachorro criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', upload.single('foto'), createDog);

/**
 * @swagger
 * /api/dogs/{id}:
 *   put:
 *     summary: Atualiza um cachorro
 *     tags: [Dogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do cachorro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               breed:
 *                 type: string
 *               age:
 *                 type: number
 *               weight:
 *                 type: number
 *               owner:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cachorro atualizado com sucesso
 *       404:
 *         description: Cachorro não encontrado
 */
router.put('/:id', upload.single('foto'), updateDog);

/**
 * @swagger
 * /api/dogs/{id}:
 *   delete:
 *     summary: Exclui um cachorro
 *     tags: [Dogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do cachorro
 *     responses:
 *       200:
 *         description: Cachorro excluído com sucesso
 *       404:
 *         description: Cachorro não encontrado
 */
router.delete('/:id', deleteDog);

export default router;