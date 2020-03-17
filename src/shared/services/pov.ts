import http from './httpClient';
import { Result } from 'utils/Result';

// 创建 pov 记录
export const add = async (options: any) => {
  try {
    const result = await http.post<{ message: string }>('http://localhost:3800/api/v1/pov', options);
    if (result.status == 201) return Result.ok(result.data);

    return Result.fail(result.data.message);
  } catch (error) {
    console.log(error);
    return Result.fail(error);
  }
};

// 更新 pov 记录
export const update = async (id: string, options: any) => {
  try {
    const result = await http.post<{ message: string }>(`http://localhost:3800/api/v1/pov/${id}`, options);

    if (result.status == 200) {
      return Result.ok(result.data);
    }

    return Result.fail(result.data.message);
  } catch (error) {
    return Result.fail(error);
  }
};

// export const list = async (options: any) => {

// };
