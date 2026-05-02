const approvisionnementRepo = require('../repositories/approvisionnement.repo');
const produitRepo = require('../repositories/produit.repo');
const fournisseurRepo = require('../repositories/fournisseur.repo');

class ApprovisionnementService {
  async getAllApprovisionnements() {
    return await approvisionnementRepo.findApprovisionnementsRecents();
  }

  async getApprovisionnementById(id) {
    const approvisionnement = await approvisionnementRepo.findById(id, {
      include: {
        fournisseur: true,
        produit: true
      }
    });
    if (!approvisionnement) {
      throw new Error('Approvisionnement non trouvé');
    }
    return approvisionnement;
  }

  async createApprovisionnement(data) {
    if (!data.fournisseurId || !data.produitId || !data.quantite || !data.date) {
      throw new Error('Fournisseur, produit, quantité et date sont requis');
    }

    // Vérifier que le fournisseur existe
    const fournisseur = await fournisseurRepo.findById(data.fournisseurId);
    if (!fournisseur) {
      throw new Error('Fournisseur non trouvé');
    }

    // Vérifier que le produit existe
    const produit = await produitRepo.findById(data.produitId);
    if (!produit) {
      throw new Error('Produit non trouvé');
    }

    if (data.quantite <= 0) {
      throw new Error('La quantité doit être positive');
    }

    // Créer l'approvisionnement et mettre à jour le stock
    return await approvisionnementRepo.createApprovisionnementWithStockUpdate({
      ...data,
      quantite: Number(data.quantite)
    });
  }

  async updateApprovisionnement(id, data) {
    const approvisionnement = await approvisionnementRepo.findById(id);
    if (!approvisionnement) {
      throw new Error('Approvisionnement non trouvé');
    }
    return await approvisionnementRepo.update(id, data);
  }

  async deleteApprovisionnement(id) {
    const approvisionnement = await approvisionnementRepo.findById(id);
    if (!approvisionnement) {
      throw new Error('Approvisionnement non trouvé');
    }
    return await approvisionnementRepo.delete(id);
  }

  async getApprovisionnementsByFournisseur(fournisseurId) {
    const fournisseur = await fournisseurRepo.findById(fournisseurId);
    if (!fournisseur) {
      throw new Error('Fournisseur non trouvé');
    }
    return await approvisionnementRepo.findApprovisionnementsByFournisseur(fournisseurId);
  }

  async getApprovisionnementsByProduit(produitId) {
    const produit = await produitRepo.findById(produitId);
    if (!produit) {
      throw new Error('Produit non trouvé');
    }
    return await approvisionnementRepo.findApprovisionnementsByProduit(produitId);
  }
}

module.exports = new ApprovisionnementService();
