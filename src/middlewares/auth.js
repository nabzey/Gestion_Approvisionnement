const jwt = require('jsonwebtoken');
const response = require('../utils/response');

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.errorResponse(res, 'Accès non autorisé : Token manquant', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-jwt-secret-key');
    
    req.user = decoded;
    next();
  } catch (error) {
    return response.errorResponse(res, 'Accès non autorisé : Token invalide', 401);
  }
};

module.exports = auth;
