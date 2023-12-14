const handleServerError = (res, error) => {
  console.error("Internal server error:", error);
  res.status(500).json({ error: "Internal server error", details: error.message });
};

const handleNotFoundError = (res, message) => {
  res.status(404).json({ error: message });
};

const handleConflictError = (res, message) => {
  res.status(409).json({ error: message });
};

module.exports = { handleServerError, handleNotFoundError, handleConflictError };
