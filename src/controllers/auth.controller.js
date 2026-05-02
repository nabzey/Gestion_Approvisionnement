const authService = require('../services/auth.service');
const response = require('../utils/response');

class AuthController {
  async register(req, res) {
    try {
      const result = await authService.register(req.body);
      return response.successResponse(res, result, 'Utilisateur inscrit avec succès', 201);
    } catch (error) {
      return response.errorResponse(res, error.message, 400);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      return response.successResponse(res, result, 'Connexion réussie');
    } catch (error) {
      return response.errorResponse(res, error.message, 401);
    }
  }
}

module.exports = new AuthController();
