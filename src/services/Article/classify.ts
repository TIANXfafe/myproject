import { request } from "umi";

/**
 * 获取所有分类
 * @param options
 */
export const fetchClassifies = async(params: any, options?: { [key: string]: any }) => {
  return request<API.NoticeIconList>('/v1/article/classify', {
    method: 'GET',
    data: {
      ...params
    },
    ...(options || {}),
  });
}
