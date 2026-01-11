// server/src/models/User.js

class User {
  constructor({ id, name, email, role = "user" }) {
    this.id = id || null;
    this.name = name || "";
    this.email = email || "";
    this.role = role;
    this.createdAt = new Date();
  }

  // dummy save (future DB ready)
  async save() {
    return {
      success: true,
      user: this,
    };
  }

  // dummy static method
  static async findByEmail(email) {
    // later DB query hobe
    return null;
  }
}

export default User;
