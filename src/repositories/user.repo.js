const BaseRepository = require('./BaseRepository');

class UserRepository extends BaseRepository {
  constructor() {
    super('user');
  }

  async findByEmail(email) {
    return await this.findOne({ email });
  }
}

module.exports = new UserRepository();
