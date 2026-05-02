const { Router } = require('express');
const multer = require('multer');
const fournisseurController = require('../controllers/fournisseur.controller');
const produitController = require('../controllers/produit.controller');
const approvisionnementController = require('../controllers/approvisionnement.controller');
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');

const router = Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/tmp');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Le fichier doit être une image'), false);
    }
  }
});


// Auth routes
router.post('/api/auth/register', (req, res, next) => {
  /* #swagger.tags = ['Authentification']
     #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              nom: { type: "string" },
              prenom: { type: "string" },
              email: { type: "string" },
              password: { type: "string" }
            },
            required: ["nom", "prenom", "email", "password"]
          }
        }
      }
    }
  */
  next();
}, authController.register);

router.post('/api/auth/login', (req, res, next) => {
  /* #swagger.tags = ['Authentification']
     #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              password: { type: "string" }
            },
            required: ["email", "password"]
          }
        }
      }
    }
  */
  next();
}, authController.login);

// Fournisseur routes (API d'approvisionnement)
router.get('/api/fournisseurs', (req, res, next) => {
  // #swagger.tags = ['Fournisseurs']
  next();
}, fournisseurController.getAllFournisseurs);

router.get('/api/fournisseurs/:id', (req, res, next) => {
  // #swagger.tags = ['Fournisseurs']
  next();
}, fournisseurController.getFournisseurById);

router.post('/api/fournisseurs', auth, (req, res, next) => {
  /* #swagger.tags = ['Fournisseurs']
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              nom: { type: "string", example: "Fournisseur Alpha" },
              telephone: { type: "string", example: "771234567" },
              adresse: { type: "string", example: "Dakar, Sénégal" },
              email: { type: "string", example: "contact@alpha.com" },
              actif: { type: "boolean", example: true }
            },
            required: ["nom", "telephone"]
          }
        }
      }
    }
  */
  next();
}, fournisseurController.createFournisseur);

router.put('/api/fournisseurs/:id', auth, (req, res, next) => {
  /* #swagger.tags = ['Fournisseurs']
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              nom: { type: "string", example: "Fournisseur Alpha" },
              telephone: { type: "string", example: "771234567" },
              adresse: { type: "string", example: "Dakar, Sénégal" },
              email: { type: "string", example: "contact@alpha.com" },
              actif: { type: "boolean", example: true }
            }
          }
        }
      }
    }
  */
  next();
}, fournisseurController.updateFournisseur);

router.delete('/api/fournisseurs/:id', auth, (req, res, next) => {
  // #swagger.tags = ['Fournisseurs']
  // #swagger.security = [{ "bearerAuth": [] }]
  next();
}, fournisseurController.deleteFournisseur);

// Produit routes (API d'approvisionnement)
router.get('/api/produits', (req, res, next) => {
  // #swagger.tags = ['Produits']
  next();
}, produitController.getAllProduits);

router.get('/api/produits/disponibles', (req, res, next) => {
  // #swagger.tags = ['Produits']
  next();
}, produitController.getProduitsDisponibles);

router.get('/api/produits/:id', (req, res, next) => {
  // #swagger.tags = ['Produits']
  next();
}, produitController.getProduitById);

router.post('/api/produits', auth, upload.single('image'), (req, res, next) => {
  /* #swagger.tags = ['Produits']
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.requestBody = {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: 'object',
            properties: {
              libelle: { type: 'string' },
              prixUnitaire: { type: 'number' },
              quantiteStock: { type: 'integer' },
              description: { type: 'string' },
              image: { type: 'string', format: 'binary' }
            },
            required: ['libelle', 'prixUnitaire']
          }
        }
      }
    }
  */
  next();
}, produitController.createProduit);

router.put('/api/produits/:id', auth, (req, res, next) => {
  /* #swagger.tags = ['Produits']
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              libelle: { type: "string", example: "Ordinateur Portable" },
              prixUnitaire: { type: "number", example: 450000 },
              quantiteStock: { type: "integer", example: 10 },
              description: { type: "string", example: "Core i7, 16GB RAM" }
            }
          }
        }
      }
    }
  */
  next();
}, produitController.updateProduit);

router.delete('/api/produits/:id', auth, (req, res, next) => {
  // #swagger.tags = ['Produits']
  // #swagger.security = [{ "bearerAuth": [] }]
  next();
}, produitController.deleteProduit);

router.patch('/api/produits/:id/increment', auth, (req, res, next) => {
  // #swagger.tags = ['Produits']
  // #swagger.security = [{ "bearerAuth": [] }]
  next();
}, produitController.incrementerStock);

router.patch('/api/produits/:id/decrement', auth, (req, res, next) => {
  // #swagger.tags = ['Produits']
  // #swagger.security = [{ "bearerAuth": [] }]
  next();
}, produitController.decrementerStock);

// Approvisionnement routes (API d'approvisionnement)
router.get('/api/approvisionnements', (req, res, next) => {
  // #swagger.tags = ['Approvisionnements']
  next();
}, approvisionnementController.getAllApprovisionnements);

router.get('/api/approvisionnements/:id', (req, res, next) => {
  // #swagger.tags = ['Approvisionnements']
  next();
}, approvisionnementController.getApprovisionnementById);

router.post('/api/approvisionnements', auth, (req, res, next) => {
  /* #swagger.tags = ['Approvisionnements']
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              quantite: { type: "integer", example: 5 },
              commentaire: { type: "string", example: "Réassort stock mensuel" },
              fournisseurId: { type: "integer", example: 1 },
              produitId: { type: "integer", example: 1 }
            },
            required: ["quantite", "fournisseurId", "produitId"]
          }
        }
      }
    }
  */
  next();
}, approvisionnementController.createApprovisionnement);

router.put('/api/approvisionnements/:id', auth, (req, res, next) => {
  /* #swagger.tags = ['Approvisionnements']
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              quantite: { type: "integer", example: 5 },
              commentaire: { type: "string", example: "Réassort stock mensuel" },
              fournisseurId: { type: "integer", example: 1 },
              produitId: { type: "integer", example: 1 }
            }
          }
        }
      }
    }
  */
  next();
}, approvisionnementController.updateApprovisionnement);

router.delete('/api/approvisionnements/:id', auth, (req, res, next) => {
  // #swagger.tags = ['Approvisionnements']
  // #swagger.security = [{ "bearerAuth": [] }]
  next();
}, approvisionnementController.deleteApprovisionnement);

router.get('/api/fournisseurs/:fournisseurId/approvisionnements', (req, res, next) => {
  // #swagger.tags = ['Approvisionnements']
  next();
}, approvisionnementController.getApprovisionnementsByFournisseur);

router.get('/api/produits/:produitId/approvisionnements', (req, res, next) => {
  // #swagger.tags = ['Approvisionnements']
  next();
}, approvisionnementController.getApprovisionnementsByProduit);

module.exports = router;
