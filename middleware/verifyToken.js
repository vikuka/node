const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  return new Promise((resolve, reject) => {
    const token = req.headers.authorization;

    if (!token) {
      reject({
        status: 401,
        message: "Token de autenticacion no proporcionado",
      });
    }

    jwt.verify(
      token.split(" ")[1],
      "98340d4914368e0612ce43d67b7c839d0eccae5c3e428860931e12a650968978",
      (error, decodedToken) => {
        if (error) {
          reject({ status: 401, message: "Token de autenticacion no valido" });
        } else {
          req.userId = decodedToken.userId; // Agregamos el ID de usuario decodificado para su posterior uso
          resolve();
        }
      }
    );
  })
    .then(() => next()) // Continua el seguimiento del siguiente middleware o del siguiente controlador
    .catch((error) =>
      res.status(error.status || 500).json({ message: error.message })
    );
}

module.exports = verifyToken;