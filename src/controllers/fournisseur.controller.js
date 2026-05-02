const fournisseurService = require('../services/fournisseur.service');
const response = require('../utils/response');

class FournisseurController {
  async getAllFournisseurs(req, res) {
    try {
      const { actif } = req.query;
      const options = { actif: actif === 'true' };
      const fournisseurs = await fournisseurService.getAllFournisseurs(options);
      return response.successResponse(res, fournisseurs, 'Fournisseurs récupérés avec succès');
    } catch (error) {
      return response.errorResponse(res, error.message, 500);
    }
  }

  async getFournisseurById(req, res) {
    try {
      const { id } = req.params;
      const fournisseur = await fournisseurService.getFournisseurById(id);
      return response.successResponse(res, fournisseur, 'Fournisseur récupéré avec succès');
    } catch (error) {
      return response.errorResponse(res, error.message, 404);
    }
  }

  async createFournisseur(req, res) {
    try {
      const fournisseur = await fournisseurService.createFournisseur(req.body);
      return response.successResponse(res, fournisseur, 'Fournisseur créé avec succès', 201);
    } catch (error) {
      return response.errorResponse(res, error.message, 400);
    }
  }

  async updateFournisseur(req, res) {
    try {
      const { id } = req.params;
      const fournisseur = await fournisseurService.updateFournisseur(id, req.body);
      return response.successResponse(res, fournisseur, 'Fournisseur mis à jour avec succès');
    } catch (error) {
      return response.errorResponse(res, error.message, 400);
    }
  }

  async deleteFournisseur(req, res) {
    try {
      const { id } = req.params;
      await fournisseurService.deleteFournisseur(id);
      return response.successResponse(res, null, 'Fournisseur supprimé avec succès');
    } catch (error) {
      return response.errorResponse(res, error.message, 400);
    }
  }

  async searchFournisseurs(req, res) {
    try {
      const { q } = req.query;
      const fournisseurs = await fournisseurService.searchFournisseurs(q);
      return response.successResponse(res, fournisseurs, 'Fournisseurs trouvés avec succès');
    } catch (error) {
      return response.errorResponse(res, error.message, 500);
    }
  }
}

module.exports = new FournisseurController();
