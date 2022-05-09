const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(err.stack);
  }
  if (err.name === "CastError") {
    return res
      .status(400)
      .json({ error: "Whatever you passed is an invalid ObjectId" });
  }
  res.status(err.statusCode || 500).json({ error: err.message });
};

export default errorHandler;
