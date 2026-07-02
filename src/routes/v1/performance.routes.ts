import express from "express";

const router = express.Router();

/**
 * Performance APIs
 */

router.post("/", (req, res) => {
  res.send("Create Performance API");
});

router.get("/", (req, res) => {
  res.send("Get All Performance APIs");
});

router.get("/:id", (req, res) => {
  res.send("Get Performance By ID");
});

router.put("/:id", (req, res) => {
  res.send("Update Performance");
});

router.delete("/:id", (req, res) => {
  res.send("Delete Performance");
});

export default router;