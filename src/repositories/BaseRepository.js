const { prisma } = require('../config/db');

class BaseRepository {
  constructor(modelName) {
    this.modelName = modelName;
    this.model = prisma[modelName];
    if (!this.model) {
      throw new Error(`Model ${modelName} not found in Prisma client`);
    }
  }

  async findAll(options = {}) {
    const { include, select, where, orderBy, skip, take } = options;
    return await this.model.findMany({
      where,
      include,
      select,
      orderBy,
      skip,
      take
    });
  }

  async findById(id, options = {}) {
    const { include, select } = options;
    return await this.model.findUnique({
      where: { id: Number(id) },
      include,
      select
    });
  }

  async findOne(where, options = {}) {
    const { include, select } = options;
    return await this.model.findFirst({
      where,
      include,
      select
    });
  }

  async create(data) {
    return await this.model.create({
      data
    });
  }

  async update(id, data) {
    return await this.model.update({
      where: { id: Number(id) },
      data
    });
  }

  async updateMany(where, data) {
    return await this.model.updateMany({
      where,
      data
    });
  }

  async upsert(where, createData, updateData) {
    return await this.model.upsert({
      where,
      create: createData,
      update: updateData
    });
  }

  async delete(id) {
    return await this.model.delete({
      where: { id: Number(id) }
    });
  }

  async deleteMany(where) {
    return await this.model.deleteMany({
      where
    });
  }

  async count(where = {}) {
    return await this.model.count({
      where
    });
  }

  async exists(where) {
    const count = await this.count(where);
    return count > 0;
  }

  async findWithPagination(page = 1, limit = 10, options = {}) {
    const skip = (page - 1) * limit;
    const take = limit;
    const { include, select, where, orderBy } = options;

    const [data, total] = await Promise.all([
      this.model.findMany({
        where,
        include,
        select,
        orderBy,
        skip,
        take
      }),
      this.model.count({ where })
    ]);

    return {
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    };
  }

  async transaction(operations) {
    return await prisma.$transaction(operations);
  }
}

module.exports = BaseRepository;
