export const generalMiddleware = (request, response, next) => {
  const timeString = new Date().toLocaleDateString();
  const { method, url } = request;
  console.log(`[${timeString}]: ${method} - ${url}`);
  next();
};

export const prevHomeMiddleware = (request, response, next) => {
  console.log(`Ejecutando middleware despues del general`);
  next();
};
