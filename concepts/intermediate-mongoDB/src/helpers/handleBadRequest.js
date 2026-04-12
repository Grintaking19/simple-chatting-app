const handleBadRequest = (res, err, message) => {
  console.error("Error occured:", err);
  res.status(500).json({ error: message });
};

export { handleBadRequest };
