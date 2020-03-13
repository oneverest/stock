// import http from 'axios';
import http from './httpClient';
import { Result } from '../utils/Result';

export default async (email: string, password: string) => {
  try {
    const result = await http.post<{ message: string }>('http://localhost:3800/api/v1/user/login', { email, password });
    if (result.status == 200) {
      return Result.ok(result.data);
    }
    return Result.fail(result.data.message);
  } catch (error) {
    console.log(error);
    return Result.fail(error);
  }
};

export const checkLogin = async () => {
  try {
    const result = await http.post<{ message: string }>('http://localhost:3800/checkLogin');
    if (result.status == 200) {
      return Result.ok(result.data);
    }
    return Result.fail(result.data.message);
  } catch (error) {
    return Result.fail(error);
  }
};

export const logout = async () => {
  try {
    const result = await http.post<{ message: string }>('http://localhost:3800/logout');
    if (result.status == 200) {
      return Result.ok(result.data);
    }
    return Result.fail(result.data.message);
  } catch (error) {
    return Result.fail(error);
  }
};

export const register = async (email: string, password: string) => {
  try {
    const result = await http.post<{ message: string }>('http://localhost:3800/register', { email, password });
    console.log(result);
    if (result.status == 201) {
      return Result.ok();
    }
    return Result.fail(result.data.message);
  } catch (error) {
    return Result.fail(error);
  }
};
