import { request } from "umi";

/**
 * 获取所有分类
 * @param options
 */
export const fetchClassifies = async(params: any, options?: { [key: string]: any }) => {
  return request<API.NoticeIconList>('/api/article/classify', {
    method: 'POST',
    data: {
      ...params
    },
    ...(options || {}),
  });
}
