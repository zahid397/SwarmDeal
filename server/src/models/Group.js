// server/src/models/Group.js

class Group {
  constructor({ id, name, ownerId }) {
    this.id = id || null;
    this.name = name || "";
    this.ownerId = ownerId || null;
    this.createdAt = new Date();
  }

  async save() {
    return {
      success: true,
      group: this,
    };
  }

  static async findById(id) {
    return null;
  }

  static async findAll() {
    return [];
  }
}

export default Group;
