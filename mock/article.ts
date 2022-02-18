import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'POST /api/article/classify': async (req: Request, res: Response) => {
    if (Object.keys(req.body).length) {
      await waitTime(2000);
      console.log('req.body', req.body);
    } else {
      res.send({
        code: 200,
        message: '成功',
        data: [
          {
            id: '01',
            key: '01',
            name: '一级分类1',
            article: 10,
            creator: 'ceshi',
            createdAt: 1645170247000,
            status: {
              color: "green",
              text: "已发布"
            },
            children: [
              {
                id: '001',
                key: '001',
                name: '二级分类1',
                article: 100,
                creator: 'ceshi',
                createdAt: 1645170247000,
                status: {
                  color: "red",
                  text: "未发布"
                }
              },
              {
                id: '002',
                key: '002',
                name: '二级分类2',
                article: 101,
                creator: 'ceshi',
                createdAt: 1645170247000,
                status: {
                  color: "red",
                  text: "未发布"
                }
              }
            ]
          },
          {
            id: '02',
            key: '02',
            name: '一级分类2',
            article: 11,
            creator: 'ceshi',
            createdAt: 1645170247000,
            status: {
              color: "red",
              text: "未发布"
            },
            children: []
          }
        ]
      })
    }

  }
}
