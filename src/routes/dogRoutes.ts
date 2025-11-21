import { Router } from 'express';
// IMPORTANTE: Importando o configurador de upload (Multer)
import upload from '../config/multer'; 
import { 
  getAllDogs, 
  getDogById, 
  createDog, 
  updateDog, 
  deleteDog 
} from '../controllers/dogController';

const router = Router();

/**
 * @swagger
 * components:
 * schemas:
 * Dog:
 * type: object
 * required:
 * - name
 * - breed
 * - age
 * properties:
 * _id:
 * type: string
 * description: ID automático gerado pelo MongoDB
 * name:
 * type: string
 * description: Nome do cão
 * breed:
 * type: string
 * description: Raça do cão
 * age:
 * type: number
 * description: Idade do cão
 * description:
 * type: string
 * description: Descrição do cão
 * imageUrl:
 * type: string
 * description: URL da imagem do cão
 * createdAt:
 * type: string
 * format: date
 * description: Data de criação do registro
 * updatedAt:
 * type: string
 * format: date
 * description: Data da última atualização
 */

/**
 * @swagger
 * /api/dogs:
 * get:
 * summary: Retorna todos os cães
 * tags: [Dogs]
 * responses:
 * 200:
 * description: Lista de todos os cães
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Dog'
 */
router.get('/', getAllDogs);

/**
 * @swagger
 * /api/dogs/{id}:
 * get:
 * summary: Obtém um cão pelo ID
 * tags: [Dogs]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID do cão
 * responses:
 * 200:
 * description: Detalhes do cão
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Dog'
 * 404:
 * description: Cão não encontrado
 */
router.get('/:id', getDogById);

/**
 * @swagger
 * /api/dogs:
 * post:
 * summary: Cria um novo cão
 * tags: [Dogs]
 * requestBody:
 * required: true
 * content:
 * multipart/form-data:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * breed:
 * type: string
 * age:
 * type: number
 * image:
 * type: string
 * format: binary
 * responses:
 * 201:
 * description: Cão criado com sucesso
 * 400:
 * description: Dados inválidos
 */
// CORREÇÃO AQUI: Adicionado upload.single('image')
router.post('/', upload.single('image'), createDog);

/**
 * @swagger
 * /api/dogs/{id}:
 * put:
 * summary: Atualiza um cão pelo ID
 * tags: [Dogs]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID do cão
 * requestBody:
 * required: true
 * content:
 * multipart/form-data:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * breed:
 * type: string
 * age:
 * type: number
 * image:
 * type: string
 * format: binary
 * responses:
 * 200:
 * description: Cão atualizado com sucesso
 * 404:
 * description: Cão não encontrado
 */
// CORREÇÃO AQUI: Adicionado upload.single('image') para permitir trocar a foto
router.put('/:id', upload.single('image'), updateDog);

/**
 * @swagger
 * /api/dogs/{id}:
 * delete:
 * summary: Remove um cão pelo ID
 * tags: [Dogs]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID do cão
 * responses:
 * 200:
 * description: Cão removido com sucesso
 * 404:
 * description: Cão não encontrado
 */
router.delete('/:id', deleteDog);

export default router;
