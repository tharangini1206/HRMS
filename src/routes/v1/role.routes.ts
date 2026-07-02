import express from "express";

import {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole
} from "../../controllers/role.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import {
  createRoleSchema,
  updateRoleSchema
} from "../../validations/role.validation";
import { rbac } from "../../middlewares/rbac.middleware";


const router = express.Router();

router.post(
  "/",
  authMiddleware,
  rbac(["super_admin"]),
  validationMiddleware(createRoleSchema),
  createRole
);

router.get(
  "/",
  authMiddleware,
  rbac(["super_admin", "hr_admin"]),
  getRoles
);

router.get(
  "/:id",
  authMiddleware,
  rbac(["super_admin", "hr_admin"]),
  getRoleById
);

router.put(
  "/:id",
  authMiddleware,
  rbac(["super_admin"]),
  validationMiddleware(updateRoleSchema),
  updateRole
);

router.delete(
  "/:id",
  authMiddleware,
  rbac(["super_admin"]),
  deleteRole
);

export default router;