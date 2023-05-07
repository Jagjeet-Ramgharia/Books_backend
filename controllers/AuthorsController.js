const AuthorModel = require("../Models/AuthorModel");

const GetAuthors = async (req, res) => {
  try {
    const allAuthors = await AuthorModel.find();
    return res.status(200).json({
      message: "Authors fetch successfully",
      authors: allAuthors,
    });
  } catch (error) {
    return res.status(200).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  GetAuthors,
};
