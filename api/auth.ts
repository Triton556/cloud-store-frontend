import axios from '@/core/axios';
import {
  LoginFormDTO,
  LoginResponseDTO,
  RegisterFormDTO,
  RegisterResponseDTO,
} from '@/api/dto/auth.dto';
import { AxiosResponse } from 'axios';
import { User } from '@/api/dto/user.dto';
import { destroyCookie } from 'nookies';

export const login = (
  values: LoginFormDTO,
): Promise<AxiosResponse<LoginResponseDTO>> => {
  return axios.post('auth/login', values);
};

export const register = (
  values: RegisterFormDTO,
): Promise<AxiosResponse<RegisterResponseDTO>> => {
  return axios.post('auth/register', values);
};

export const getMe = (): Promise<AxiosResponse<User>> => {
  return axios.get('users/me');
};

export const logout = () => {
  destroyCookie(null, '_token', { path: '/' });
};
