const express = require("express");
const router = express.Router();
const { get_products,patch_product,post_product, delete_product } = require("../controller/sellers-contr");

router.route("/api/v1/sellers").get(get_products).post(post_product);
router.route('/api/v1/sellers/:id').patch(patch_product).delete(delete_product);

module.exports = router;
 