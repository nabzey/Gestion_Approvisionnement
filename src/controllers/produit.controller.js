const produitService = require('../services/produit.service');
const response = require('../utils/response');

class ProduitController {
  async getAllProduits(req, res) {
    try {
      const produits = await produitService.getAllProduits();
      return response.successResponse(res, produits, 'Produits récupérés avec succès');
    } catch (error) {
      return response.errorResponse(res, error.message, 500);
    }
  }

  async getProduitById(req, res) {
    try {
      const { id } = req.params;
      const produit = await produitService.getProduitById(id);
      return response.successResponse(res, produit, 'Produit récupéré avec succès');
    } catch (error) {
      return response.errorResponse(res, error.message, 404);
    }
  }

  async createProduit(req, res) {
    try {
      const produit = await produitService.createProduit(req.body, req.file);
      return response.successResponse(res, produit, 'Produit créé avec succès', 201);
    } catch (error) {
      return response.errorResponse(res, error.message, 400);
    }
  }

  async updateProduit(req, res) {
    try {
      const { id } = req.params;
      const produit = await produitService.updateProduit(id, req.body);
      return response.successResponse(res, produit, 'Produit mis à jour avec succès');
    } catch (error) {
      return response.errorResponse(res, error.message, 400);
    }
  }

  async deleteProduit(req, res) {
    try {
      const { id } = req.params;
      await produitService.deleteProduit(id);
      return response.successResponse(res, null, 'Produit supprimé avec succès');
    } catch (error) {
      return response.errorResponse(res, error.message, 400);
    }
  }

  async incrementerStock(req, res) {
    try {
      const { id } = req.params;
      const { quantite } = req.body;
      const produit = await produitService.incrementerStock(id, Number(quantite));
      return response.successResponse(res, produit, 'Stock incrémenté avec succès');
    } catch (error) {
      return response.errorResponse(res, error.message, 400);
    }
  }

  async decrementerStock(req, res) {
    try {
      const { id } = req.params;
      const { quantite } = req.body;
      const produit = await produitService.decrementerStock(id, Number(quantite));
      return response.successResponse(res, produit, 'Stock décrémenté avec succès');
    } catch (error) {
      return response.errorResponse(res, error.message, 400);
    }
  }

  async getProduitsDisponibles(req, res) {
    try {
      const produits = await produitService.getProduitsDisponibles();
      return response.successResponse(res, produits, 'Produits disponibles récupérés avec succès');
    } catch (error) {
      return response.errorResponse(res, error.message, 500);
    }
  }
}

module.exports = new ProduitController();
