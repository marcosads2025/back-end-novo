import swaggerJSDoc from 'swagger-jsdoc';
import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '🐕 Dog API',
      version: '1.0.0',
      description: 'API para buscar imagens de cachorros e gerenciar favoritos',
      contact: {
        name: 'Dog API Support',
        email: 'support@dogapi.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento'
      }
    ],
    components: {
      schemas: {
        RandomDogResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              properties: {
                image_url: {
                  type: 'string',
                  example: 'https://images.dog.ceo/breeds/husky/n02110185_1469.jpg'
                },
                status: {
                  type: 'string',
                  example: 'success'
                }
              }
            }
          }
        },
        BreedDogResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              properties: {
                breed: {
                  type: 'string',
                  example: 'husky'
                },
                images: {
                  type: 'array',
                  items: {
                    type: 'string'
                  },
                  example: ['https://images.dog.ceo/breeds/husky/n02110185_1469.jpg']
                },
                count: {
                  type: 'number',
                  example: 15
                },
                status: {
                  type: 'string',
                  example: 'success'
                }
              }
            }
          }
        },
        FavoriteDogRequest: {
          type: 'object',
          required: ['name', 'breed', 'image_url'],
          properties: {
            name: {
              type: 'string',
              example: 'Buddy',
              description: 'Nome do cachorro'
            },
            breed: {
              type: 'string',
              example: 'Golden Retriever',
              description: 'Raça do cachorro'
            },
            image_url: {
              type: 'string',
              example: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_1003.jpg',
              description: 'URL da imagem do cachorro'
            }
          }
        },
        FavoriteDogResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Cachorro favorito salvo com sucesso!'
            },
            data: {
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                  example: 1
                },
                name: {
                  type: 'string',
                  example: 'Buddy'
                },
                breed: {
                  type: 'string',
                  example: 'Golden Retriever'
                },
                image_url: {
                  type: 'string',
                  example: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_1003.jpg'
                },
                create_at: {
                  type: 'string',
                  format: 'date-time',
                  example: '2024-01-15T10:30:00Z'
                }
              }
            }
          }
        },
        FavoritesListResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              properties: {
                favorites: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/FavoriteDogResponse/data'
                  }
                },
                count: {
                  type: 'number',
                  example: 3
                }
              }
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              example: 'Erro ao processar requisição'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Caminhos para arquivos com anotações
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  // Configuração do Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Dog API Documentation',
    customfavIcon: 'https://cdn-icons-png.flaticon.com/512/616/616408.png'
  }));

  // Rota para o JSON do Swagger
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
};
