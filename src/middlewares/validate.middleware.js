const validate = (schema, source = "body") => {
  return (req, res, next) => {
    try {
      const data = schema.parse(req[source]);

      req.validated = {
        ...req.validated,
        [source]: data,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validate;
