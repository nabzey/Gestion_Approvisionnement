const approvisionnementService = require('../services/approvisionnement.service');
const response = require('../utils/response');

class ApprovisionnementController {
  async getAllApprovisionnements(req, res) {
    try {
      const approvisionnements = await approvisionnementService.getAllApprovisionnements();
      return response.successResponse(res, approvisionnements, 'Approvisionnements récupérés avec succès');
    } catch (error) {
      return response.errorResponse(res, error.message, 500);
    }
  }

  async getApprovisionnementById(req, res) {
    try {
      const { id } = req.params;
      const approvisionnement = await approvisionnementService.getApprovisionnementById(id);
      return response.successResponse(res, approvisionnement, 'Approvisionnement récupéré avec succès');
    } catch (error) {
      return response.errorResponse(res, error.message, 404);
    }
  }

  async createApprovisionnement(req, res) {
    try {
      const approvisionnement = await approvisionnementService.createApprovisionnement(req.body);
      return response.successResponse(res, approvisionnement, 'Approvisionnement créé avec succès', 201);
    } catch (error) {
      return response.errorResponse(res, error.message, 400);
    }
  }

  async updateApprovisionnement(req, res) {
    try {
      const { id } = req.params;
      const approvisionnement = await approvisionnementService.updateApprovisionnement(id, req.body);
      return response.successResponse(res, approvisionnement, 'Approvisionnement mis à jour avec succès');
    } catch (error) {
      return response.errorResponse(res, error.message, 400);
    }
  }

  async deleteApprovisionnement(req, res) {
    try {
      const { id } = req.params;
      await approvisionnementService.deleteApprovisionnement(id);
      return response.successResponse(res, null, 'Approvisionnement supprimé avec succès');
    } catch (error) {
      return response.errorResponse(res, error.message, 400);
    }
  }

  async getApprovisionnementsByFournisseur(req, res) {
    try {
      const { fournisseurId } = req.params;
      const approvisionnements = await approvisionnementService.getApprovisionnementsByFournisseur(fournisseurId);
      return response.successResponse(res, approvisionnements, 'Approvisionnements récupérés avec succès');
    } catch (error) {
      return response.errorResponse(res, error.message, 404);
    }
  }

  async getApprovisionnementsByProduit(req, res) {
    try {
      const { produitId } = req.params;
      const approvisionnements = await approvisionnementService.getApprovisionnementsByProduit(produitId);
      return response.successResponse(res, approvisionnements, 'Approvisionnements récupérés avec succès');
    } catch (error) {
      return response.errorResponse(res, error.message, 404);
    }
  }
}

module.exports = new ApprovisionnementController();
