import { supabase } from "../config/supabase";

export const loginRepository = async (
  email: string,
  password: string
) => {

  /**
   * Login
   */

  const { data, error } =
    await supabase.auth.signInWithPassword({

      email,

      password

    });

  if (error || !data.user || !data.session) {

    return {
      data: null,
      error
    };

  }

  /**
   * Get User
   */

  const { data: user } =
    await supabase
      .from("users")
      .select("*")
      .eq("auth_user_id", data.user.id)
      .single();

  /**
   * Get Employee Profile
   */

  const { data: profile } =
    await supabase
      .from("employee_profiles")
      .select("*")
      .eq("user_id", data.user.id)
      .single();

  /**
   * Get Role
   */

  let role = null;

  if (profile) {

    const { data: roleData } =
      await supabase
        .from("roles")
        .select("*")
        .eq("id", profile.role_id)
        .single();

    role = roleData;

  }

  /**
   * Dashboard
   */

  const dashboard =
    role?.name ?? "employee";

  /**
   * Permissions
   */

  let permissions: string[] = [];

  switch (role?.name) {

    case "super_admin":

      permissions = [

        "roles",

        "departments",

        "designations",

        "employees",

        "onboarding",

        "payroll",

        "salary_components"

      ];

      break;

    case "hr_admin":

      permissions = [

        "departments",

        "designations",

        "employees",

        "onboarding",

        "payroll",

        "salary_components"

      ];

      break;

    case "finance":

      permissions = [

        "payroll",

        "salary_components"

      ];

      break;

    case "manager":

      permissions = [

        "employees"

      ];

      break;

    case "employee":

      permissions = [];

      break;

  }

  return {

    data: {

      user: {

        id: data.user.id,

        email: data.user.email,

        first_name: user?.first_name,

        last_name: user?.last_name

      },

      role,

      dashboard,

      permissions,

      session: {

        access_token: data.session.access_token,

        refresh_token: data.session.refresh_token,

        expires_at: data.session.expires_at,

        expires_in: data.session.expires_in

      }

    },

    error: null

  };

};

export const logoutRepository = async () => {

  return await supabase.auth.signOut();

};

export const refreshTokenRepository = async (
  refreshToken: string
) => {

  return await supabase.auth.refreshSession({

    refresh_token: refreshToken

  });

};