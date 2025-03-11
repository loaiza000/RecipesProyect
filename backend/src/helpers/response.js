export const response = (res, statusCode, ok, data, message) => {
  try {
    console.log("Enviando respuesta:", { statusCode, ok, data, message });
    res.status(statusCode).json({ ok, data, message });
  } catch (error) {
    console.error("Error al enviar respuesta:", error);
    res.status(500).json({
      ok: false,
      data: null,
      message: "Error interno del servidor"
    });
  }
};
