export const handleError = (err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json(err.msg || "server error");
  next();
};
