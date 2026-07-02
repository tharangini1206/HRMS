import express from "express";

const router = express.Router();

/**
 * Feedback APIs
 */

router.post("/", (req, res) => {
  res.send("Create Feedback API");
});

router.get("/", (req, res) => {
  res.send("Get All Feedback APIs");
});

router.get("/:id", (req, res) => {
  res.send("Get Feedback By ID");
});

router.put("/:id", (req, res) => {
  res.send("Update Feedback");
});

router.delete("/:id", (req, res) => {
  res.send("Delete Feedback");
});

export default router;