const BaseRepository = require('./BaseRepository');
const produitRepo = require('./produit.repo');

class ApprovisionnementRepository extends BaseRepository {
  constructor() {
    super('approvisionnement');
  }

  async findApprovisionnementsRecents() {
    return await this.findAll({
      include: {
        fournisseur: true,
        produit: true
      },
      orderBy: { date: 'desc' }
    });
  }

  async findApprovisionnementsByFournisseur(fournisseurId) {
    return await this.findAll({
      where: { fournisseurId },
      include: {
        produit: true
      },
      orderBy: { date: 'desc' }
    });
  }

  async findApprovisionnementsByProduit(produitId) {
    return await this.findAll({
      where: { produitId },
      include: {
        fournisseur: true
      },
      orderBy: { date: 'desc' }
    });
  }

  async createApprovisionnementWithStockUpdate(data) {
    const result = await this.create(data);
    await produitRepo.incrementerStock(data.produitId, data.quantite);
    return result;
  }
}

module.exports = new ApprovisionnementRepository();
