import React from "react";
import {Button, Card, message, Tag} from "antd";
import ProTable from "@ant-design/pro-table";
import type { ProColumns } from '@ant-design/pro-table';
import {ModalForm, ProFormSelect, ProFormSwitch, ProFormText} from "@ant-design/pro-form";
import {CheckOutlined, CloseOutlined, DownOutlined, PlusOutlined} from "@ant-design/icons";
import MainContent from "@/components/MainContent";
import {fetchClassifies} from "@/services/Article/classify";
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
            <ModalForm
              key="primary"
              title="新增分类"
              width="400px"
              trigger={
                <Button type="primary">
                  新增分类
                  <PlusOutlined />
                </Button>
              }
              autoFocusFirstInput
              onFinish={async (values) => {
                await waitTime(2000);
                console.log(values);
                message.success('提交成功');
                return true;
              }}
              initialValues={{
                status: false,
                parentCate: 'gen'
              }}
            >
              <ProFormText
                name="classifyName"
                label="分类名称"
                placeholder="请输入分类名称！"
                rules={[{ required: true, message: '请输入分类名称！' }]}
              />
              <ProFormSelect
                name="parentCate"
                label="父级分类"
                showSearch
                debounceTime={300}
                request={async () => {
                  await waitTime(1000);
                  return [
                    {
                      id: 1,
                      label: '根目录',
                      name: '01',
                      value: 'gen'
                    },
                    {
                      id: 2,
                      label: '一级分类1',
                      name: '02',
                      value: "yi"
                    }
                  ]
                }}
                placeholder="请选择父级分类！"
                rules={[{ required: true, message: '请选择父级分类！' }]}
              />
              <ProFormSwitch
                name="status"
                label="是否发布"
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
            </ModalForm>
          ]}
        />
      </Card>
    </MainContent>
  );
}

export default List;
