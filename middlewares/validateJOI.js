const validateJOI = schema => (req, res, next) => {
  const { error } = schema.validate(req.body);
  return error ? next(error) : next();
};

export default validateJOI;
