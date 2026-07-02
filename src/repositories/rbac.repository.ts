import { supabase } from "../config/supabase";

/**
 * Get Logged In User Role
 */
export const getUserRoleRepository = async (
  authUserId: string
) => {

  // Get Employee Profile

  const { data: profile, error: profileError } =
    await supabase
      .from("employee_profiles")
      .select("role_id")
      .eq("user_id", authUserId)
      .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  // Get Role

  const { data: role, error: roleError } =
    await supabase
      .from("roles")
      .select("*")
      .eq("id", profile.role_id)
      .single();

  if (roleError) {
    throw new Error(roleError.message);
  }

  return role;
};