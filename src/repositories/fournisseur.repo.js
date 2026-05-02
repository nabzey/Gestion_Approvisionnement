const BaseRepository = require('./BaseRepository');

class FournisseurRepository extends BaseRepository {
  constructor() {
    super('fournisseur');
  }

  async findFournisseursActifs() {
    return await this.findAll({
      where: { actif: true },
      orderBy: { nom: 'asc' }
    });
  }

  async searchFournisseurs(query) {
    return await this.findAll({
      where: {
        OR: [
          { nom: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { telephone: { contains: query, mode: 'insensitive' } }
        ]
      }
    });
  }
}

module.exports = new FournisseurRepository();
