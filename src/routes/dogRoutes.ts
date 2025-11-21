import { Router } from 'express';
import multer from 'multer'; // Importamos o multer diretamente
// IMPORTANTE: Adicionado a extensão .js no final (obrigatório no Render)
import { 
  getDogs,      // Confirme se no seu controller o nome é getDogs ou getAllDogs
  getDogById, 
  createDog, 
  updateDog, 
  deleteDog 
} from '../controllers/dogController.js'; 

// --- CONFIGURAÇÃO DE UPLOAD (MULTER) ---
// Configurado aqui mesmo para evitar erros de importação de arquivos externos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// ---------------------------------------

const router = Router();

/**
 * @swagger
 * components:
 * schemas:
 * Dog:
 * type: object
 * required:
 * - nome
 * - raca
 * - idade
 * properties:
 * id:
 * type: string
 * description: ID automático gerado pelo MongoDB
 * nome:
 * type: string
 * description: Nome do cão
 * raca:
 * type: string
 * description: Raça do cão
 * idade:
 * type: number
 * description: Idade do cão
 * image:
 * type: string
 * description: Nome do arquivo da imagem (se houver)
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
router.get('/', getDogs);

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
 * nome:
 * type: string
 * raca:
 * type: string
 * idade:
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
// CORREÇÃO: upload.single('image') processa a imagem antes de ir para o controller
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
 * content:
 * multipart/form-data:
 * schema:
 * type: object
 * properties:
 * nome:
 * type: string
 * raca:
 * type: string
 * idade:
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
