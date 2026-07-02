import {

  loginRepository,

  logoutRepository,

  refreshTokenRepository

} from "../repositories/auth.repository";

export const loginService = async (

  email: string,

  password: string

) => {

  const { data, error } =

    await loginRepository(

      email,

      password

    );

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

export const logoutService = async () => {

  const { error } =

    await logoutRepository();

  if (error) {

    throw new Error(error.message);

  }

  return true;

};

export const refreshTokenService = async (

  refreshToken: string

) => {

  const { data, error } =

    await refreshTokenRepository(

      refreshToken

    );

  if (error) {

    throw new Error(error.message);

  }

  return data;

};