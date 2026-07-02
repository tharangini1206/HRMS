import express from "express";

const router = express.Router();

/**
 * Helpdesk APIs
 */

router.post("/", (req, res) => {
  res.send("Create Helpdesk API");
});

router.get("/", (req, res) => {
  res.send("Get All Helpdesk APIs");
});

router.get("/:id", (req, res) => {
  res.send("Get Helpdesk By ID");
});

router.put("/:id", (req, res) => {
  res.send("Update Helpdesk");
});

router.delete("/:id", (req, res) => {
  res.send("Delete Helpdesk");
});

export default router;