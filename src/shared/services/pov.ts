import http from './httpClient';
import { Result } from 'utils/Result';
import * as qs from 'querystring';

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

export const getAllPovs = async (options: { start?: string; end?: string; page: number; pageSize?: number }) => {
  const { start, end, page, pageSize } = options;

  const data: any = {};
  start && (data.start = start);
  end && (data.end = end);
  data.page = page ? Number(page) : 1;
  data.pageSize = pageSize ? Number(pageSize) : 20;

  try {
    const result = await http.get<{ message: string }>('http://localhost:3800/api/v1/pov?' + qs.stringify(data));

    if (result.status == 200) {
      return Result.ok(result.data);
    }

    return Result.fail(result.data.message);
  } catch (err) {
    return Result.fail(err);
  }
};
