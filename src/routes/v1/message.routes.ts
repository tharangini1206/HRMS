import express from "express";

const router = express.Router();

/**
 * Message APIs
 */

router.post("/", (req, res) => {
  res.send("Create Message API");
});

router.get("/", (req, res) => {
  res.send("Get All Message APIs");
});

router.get("/:id", (req, res) => {
  res.send("Get Message By ID");
});

router.put("/:id", (req, res) => {
  res.send("Update Message");
});

router.delete("/:id", (req, res) => {
  res.send("Delete Message");
});

export default router;