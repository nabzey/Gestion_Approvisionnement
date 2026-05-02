const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/user.repo');

class AuthService {
  async register(data) {
    if (!data) {
      throw new Error('Les données d\'inscription sont manquantes');
    }
    const { nom, prenom, email, password } = data;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await userRepo.findByEmail(email);
    if (existingUser) {
      throw new Error('Cet email est déjà utilisé');
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await userRepo.create({
      nom,
      prenom,
      email,
      password: hashedPassword
    });

    return this.generateTokenResponse(user);
  }

  async login(email, password) {
    // Trouver l'utilisateur
    const user = await userRepo.findByEmail(email);
    if (!user) {
      throw new Error('Identifiants invalides');
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Identifiants invalides');
    }

    return this.generateTokenResponse(user);
  }

  generateTokenResponse(user) {
    const token = jwt.sign(
      { id: user.id, email: user.email, nom: user.nom, prenom: user.prenom },
      process.env.JWT_SECRET || 'your-jwt-secret-key',
      { expiresIn: '24h' }
    );

    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token
    };
  }
}

module.exports = new AuthService();
