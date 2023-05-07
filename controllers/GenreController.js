const GenreSchema = require("../Models/GenreSchema");

const getAllGenres = async (req, res) => {
  try {
    const user = req.user;
    const allGenres = await GenreSchema.find();
    return res.status(200).json({
      message: "Genres fetch successfully",
      genres: allGenres,
    });
  } catch (error) {
    return res.status(200).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  getAllGenres,
};
