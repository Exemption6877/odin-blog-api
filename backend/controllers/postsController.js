async function createPost(req, res) {
  try {
    console.log(req.body);
  } catch (err) {
    console.log(err);
  }
}

async function getAllPosts(req, res) {
  try {
    // db getall
  } catch (err) {
    console.log(err);
  }
}

async function getPostById(req, res) {
  try {
    // db.getbyid
  } catch (err) {
    console.log(err);
  }
}

async function updatePost(req, res) {
  try {
    // req.params.id
    // db.updatewhere
  } catch (err) {
    console.log(err);
  }
}

async function deletePost(req, res) {
  try {
    // req.params.id
    // db.updatewhere
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
