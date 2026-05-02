const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0', autoHeaders: false });

const doc = {
  info: {
    title: 'API de Gestion des Approvisionnements',
    description: 'API RESTful pour la gestion des approvisionnements d\'une boutique',
    version: '1.0.0',
    contact: {
      name: 'Support API',
      email: 'support@gestion-approvisionnements.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Serveur de développement'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      Fournisseur: {
        type: 'object',
        properties: {
          nom: { type: 'string', example: 'Fournisseur Alpha' },
          telephone: { type: 'string', example: '771234567' },
          adresse: { type: 'string', example: 'Dakar, Sénégal' },
          email: { type: 'string', example: 'contact@alpha.com' },
          actif: { type: 'boolean', example: true }
        }
      },
      Produit: {
        type: 'object',
        properties: {
          libelle: { type: 'string', example: 'Ordinateur Portable' },
          prixUnitaire: { type: 'number', example: 450000 },
          quantiteStock: { type: 'integer', example: 10 },
          description: { type: 'string', example: 'Core i7, 16GB RAM' }
        }
      },
      Approvisionnement: {
        type: 'object',
        properties: {
          quantite: { type: 'integer', example: 5 },
          commentaire: { type: 'string', example: 'Réassort stock mensuel' },
          fournisseurId: { type: 'integer', example: 1 },
          produitId: { type: 'integer', example: 1 }
        }
      },
      Error: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          status: { type: 'integer' }
        }
      }
    }
  },
  security: [],
  tags: [
    { name: 'Authentification', description: 'Endpoints pour l\'authentification' },
    { name: 'Fournisseurs', description: 'Gestion des fournisseurs' },
    { name: 'Produits', description: 'Gestion des produits' },
    { name: 'Approvisionnements', description: 'Gestion des approvisionnements' }
  ]
};

const outputFile = './src/config/swagger-output.json';
const routes = [
  './src/app.js',
  './src/routes/index.js'
];

module.exports = { swaggerAutogen, doc, outputFile, routes };
