import express from "express";

const router = express.Router();

/**
 * PIP APIs
 */

router.post("/", (req, res) => {
  res.send("Create PIP API");
});

router.get("/", (req, res) => {
  res.send("Get All PIP APIs");
});

router.get("/:id", (req, res) => {
  res.send("Get PIP By ID");
});

router.put("/:id", (req, res) => {
  res.send("Update PIP");
});

router.delete("/:id", (req, res) => {
  res.send("Delete PIP");
});

export default router;