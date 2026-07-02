import { Request, Response, NextFunction } from "express";
import { getUserRoleService } from "../services/rbac.service";

/**
 * Role Based Access Control Middleware
 */

export const rbac = (allowedRoles: string[]) => {

  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {

    console.log("========== RBAC MIDDLEWARE ==========");

    try {

      /**
       * Check Auth User
       */

      const authUserId = req.user?.id;

      console.log("Logged In User ID :", authUserId);

      if (!authUserId) {

        return res.status(401).json({
          success: false,
          message: "Unauthorized"
        });

      }

      /**
       * Get User Role From Database
       */

      const role = await getUserRoleService(authUserId);

      console.log("Role From Database :", role);
      console.log("Allowed Roles :", allowedRoles);

      if (!role) {

        return res.status(403).json({
          success: false,
          message: "Role not found"
        });

      }

      /**
       * Check Permission
       */

      if (!allowedRoles.includes(role.name)) {

        console.log("Access Denied");

        return res.status(403).json({
          success: false,
          message: "Access denied"
        });

      }

      console.log("Access Granted");

      /**
       * Store Role
       */

      req.user.role = role.name;

      next();

    } catch (error: any) {

      console.log("RBAC ERROR :", error);

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }

  };

};