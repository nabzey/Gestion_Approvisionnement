const BaseRepository = require('./BaseRepository');

class ProduitRepository extends BaseRepository {
  constructor() {
    super('produit');
  }

  async findProduitsDisponibles() {
    return await this.findAll({
      where: { quantiteStock: { gt: 0 } },
      orderBy: { libelle: 'asc' }
    });
  }

  async searchProduits(query) {
    return await this.findAll({
      where: {
        OR: [
          { libelle: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } }
        ]
      }
    });
  }

  async updateStock(produitId, quantite) {
    const produit = await this.findById(produitId);
    if (!produit) {
      throw new Error('Produit non trouvé');
    }
    const nouveauStock = produit.quantiteStock + quantite;
    if (nouveauStock < 0) {
      throw new Error('Stock insuffisant');
    }
    return await this.update(produitId, { quantiteStock: nouveauStock });
  }

  async incrementerStock(produitId, quantite) {
    return await this.updateStock(produitId, quantite);
  }

  async decrementerStock(produitId, quantite) {
    return await this.updateStock(produitId, -quantite);
  }
}

module.exports = new ProduitRepository();
