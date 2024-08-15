function status(request, response) {
  response.status(200).json({ key: "first endpoint" });
}

export default status;
