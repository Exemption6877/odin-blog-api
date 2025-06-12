async function createComment(req, res) {
  try {
    console.log(req.body);
  } catch (err) {
    console.log(err);
  }
}

async function getAllComments(req, res) {
  try {
    // db getall
  } catch (err) {
    console.log(err);
  }
}

async function getCommentById(req, res) {
  try {
    // db.getbyid
  } catch (err) {
    console.log(err);
  }
}

async function updateComment(req, res) {
  try {
    // req.params.id
    // db.updatewhere
  } catch (err) {
    console.log(err);
  }
}

async function deleteComment(req, res) {
  try {
    // req.params.id
    // db.updatewhere
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
