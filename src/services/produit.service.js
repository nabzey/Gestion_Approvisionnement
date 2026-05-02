const cloudinary = require('cloudinary').v2;
const produitRepo = require('../repositories/produit.repo');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || 'demo',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'demo'
});

class ProduitService {
  async getAllProduits() {
    return await produitRepo.findAll({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getProduitById(id) {
    const produit = await produitRepo.findById(id);
    if (!produit) {
      throw new Error('Produit non trouvé');
    }
    return produit;
  }

  async createProduit(data, imageFile = null) {
    if (!data.libelle || !data.prixUnitaire || !data.quantiteStock) {
      throw new Error('Libellé, prix unitaire et quantité en stock sont requis');
    }

    let imageUrl = null;
    if (imageFile) {
      try {
        const result = await cloudinary.uploader.upload(imageFile.path, {
          folder: 'produits'
        });
        imageUrl = result.secure_url;
      } catch (error) {
        throw new Error('Erreur lors de l\'upload de l\'image: ' + error.message);
      }
    }

    return await produitRepo.create({
      ...data,
      image: imageUrl,
      quantiteStock: Number(data.quantiteStock),
      prixUnitaire: Number(data.prixUnitaire)
    });
  }

  async updateProduit(id, data) {
    const produit = await produitRepo.findById(id);
    if (!produit) {
      throw new Error('Produit non trouvé');
    }
    return await produitRepo.update(id, data);
  }

  async deleteProduit(id) {
    const produit = await produitRepo.findById(id);
    if (!produit) {
      throw new Error('Produit non trouvé');
    }
    return await produitRepo.delete(id);
  }

  async incrementerStock(id, quantite) {
    if (quantite <= 0) {
      throw new Error('La quantité doit être positive');
    }
    return await produitRepo.incrementerStock(id, quantite);
  }

  async decrementerStock(id, quantite) {
    if (quantite <= 0) {
      throw new Error('La quantité doit être positive');
    }
    const produit = await produitRepo.findById(id);
    if (produit.quantiteStock < quantite) {
      throw new Error('Stock insuffisant');
    }
    return await produitRepo.decrementerStock(id, quantite);
  }

  async getProduitsDisponibles() {
    return await produitRepo.findProduitsDisponibles();
  }

  async searchProduits(query) {
    return await produitRepo.searchProduits(query);
  }
}

module.exports = new ProduitService();
