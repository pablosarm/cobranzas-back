const validatePassword = (password) => {
    // Verificar la longitud mínima de 6 caracteres
    if (password.length < 6) {
      return false;
    }
  
    // Verificar si contiene al menos una letra mayúscula
    if (!/[A-Z]/.test(password)) {
      return false;
    }
  
    // Verificar si contiene al menos un símbolo válido
    const symbolsRegex = /[!\@#\$%\^&\*\(\)\-\=_+\[\]{}\|;':",\.\/<>\?]/;
    if (!symbolsRegex.test(password)) {
      return false;
    }
  
    return true;
  };
  
  module.exports = {
    validatePassword,
  };
  