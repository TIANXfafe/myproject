import React from "react";
import { history } from "umi";
import {Button, Card, Tag} from "antd";
import ProTable from "@ant-design/pro-table";
import type { ProColumns } from '@ant-design/pro-table';
import {  DownOutlined, PlusOutlined } from "@ant-design/icons";
import MainContent from "@/components/MainContent";
import { fetchClassifies } from "@/services/Article/classify";
import moment from "moment";


export type Status = {
  flag: boolean;
  text: string;
};

export type TableListItem = {
  key: number;
  name: string;
  article: number;
  creator: string;
  status: Status;
  createdAt: number;
  updateAt: number;
};

const List: React.FC = () => {
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '文章名称',
      width: 180,
      dataIndex: 'name',
      align: 'center',
      render: (_) => <a>{_}</a>,
    },
    {
      title: '状态',
      width: 90,
      dataIndex: 'status',
      align: 'center',
      render: (_, record) =><Tag color={record.status.flag ? 'green' : 'red'}>{record.status.text}</Tag>,
    },
    {
      title: '创建者',
      width: 120,
      dataIndex: 'creator',
      align: 'center',
    },
    {
      title: "创建时间",
      width: 140,
      dataIndex: 'createdAt',
      align: 'center',
      render: (_: any, time: string) => <span>{moment(time).format("YYYY-MM-DD HH:mm:ss")}</span>,
      sorter: (a: {createdAt: number}, b: {createdAt: number}) => a.createdAt - b.createdAt,
    },
    {
      title: "编辑时间",
      width: 140,
      dataIndex: 'updateAt',
      align: 'center',
      render: (_: any, time: string) => <span>{moment(time).format("YYYY-MM-DD HH:mm:ss")}</span>,
      sorter: (a: {updateAt: number}, b: {updateAt: number}) => a.updateAt - b.updateAt,
    },
    {
      title: '操作',
      width: 164,
      key: 'option',
      valueType: 'option',
      align: 'center',
      render: () => [
        <a key="1">编辑</a>,
        <a key="2">删除</a>,
      ],
    },
  ]

  return (
    <MainContent>
      <Card style={{marginTop: '10px'}}>
        <ProTable
          columns={columns}
          rowKey="key"
          request={async () => {
            const params: any = {}
            console.log('params', params)
            const response = await fetchClassifies(params)
            console.log('response', response)
            return response
          }}
          pagination={{
            showQuickJumper: true,
          }}
          search={false}
          options={false}
          toolBarRender={() => [
            <Button key="show">查看日志</Button>,
            <Button key="out">
              导出数据
              <DownOutlined />
            </Button>,
            <Button key="add" type="primary" onClick={() => history.push("/article/create")}>
              新增文章
              <PlusOutlined />
            </Button>
          ]}
        />
      </Card>
    </MainContent>
  );
}

export default List;
