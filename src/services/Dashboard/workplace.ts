import { request } from "umi";

/**
 * 工作台获取项目
 * @param options
 */
export async function queryProjectNotice(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/project/notice', {
    method: 'GET',
    ...(options || {}),
  });
}
