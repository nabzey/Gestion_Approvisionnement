const fournisseurRepo = require('../repositories/fournisseur.repo');

class FournisseurService {
  async getAllFournisseurs(options = {}) {
    const { actif } = options;
    if (actif) {
      return await fournisseurRepo.findFournisseursActifs();
    }
    return await fournisseurRepo.findAll({
      orderBy: { nom: 'asc' }
    });
  }

  async getFournisseurById(id) {
    const fournisseur = await fournisseurRepo.findById(id);
    if (!fournisseur) {
      throw new Error('Fournisseur non trouvé');
    }
    return fournisseur;
  }

  async createFournisseur(data) {
    if (!data.nom || !data.telephone) {
      throw new Error('Nom et téléphone sont requis');
    }
    return await fournisseurRepo.create(data);
  }

  async updateFournisseur(id, data) {
    const fournisseur = await fournisseurRepo.findById(id);
    if (!fournisseur) {
      throw new Error('Fournisseur non trouvé');
    }
    return await fournisseurRepo.update(id, data);
  }

  async deleteFournisseur(id) {
    const fournisseur = await fournisseurRepo.findById(id);
    if (!fournisseur) {
      throw new Error('Fournisseur non trouvé');
    }
    return await fournisseurRepo.delete(id);
  }

  async searchFournisseurs(query) {
    return await fournisseurRepo.searchFournisseurs(query);
  }
}

module.exports = new FournisseurService();
