import React from "react";
import {Card, Form, Statistic, Button, Tag} from "antd";
import { DownOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import QueueAnim from "rc-queue-anim";
import MainContent from "@/components/MainContent";
import StandardFormRow from '@/components/StandardFormRow';
import TagSelect from '@/components/TagSelect';
import { fetchClassifies } from "@/services/Article/classify";
import styles from "./index.less";
import moment from "moment";

export type Status = {
  color: string;
  text: string;
};

export type TableListItem = {
  key: number;
  name: string;
  article: number;
  creator: string;
  status: Status;
  createdAt: number;
};

const FormItem = Form.Item;

const Content: React.FC = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="一级分类" value={10} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="二级分类" value={10} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="三级分类" value={10} />
    </div>
  </div>
);

const Classify: React.FC = () => {
  const [form] = Form.useForm();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '分类名称',
      width: 120,
      dataIndex: 'name',
      align: 'center',
      render: (_) => <a>{_}</a>,
    },
    {
      title: '状态',
      width: 120,
      dataIndex: 'status',
      align: 'center',
      render: (_, record) =><Tag color={record.status.color}>{record.status.text}</Tag>,
    },
    {
      title: '文章数量',
      width: 120,
      dataIndex: 'article',
      align: 'center',
      key: 'since',
      sorter: (a, b) => a.article - b.article,
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
      key: 'option',
      render: (_: any, time: string) => <span>{moment(time).format("YYYY-MM-DD HH:mm:ss")}</span>,
      sorter: (a: {createdAt: number}, b: {createdAt: number}) => a.createdAt - b.createdAt,
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
    <MainContent
      content={<Content />}
    >
      <QueueAnim type="bottom">
        <Card key="header">
          <Form
            layout="inline"
            form={form}
            initialValues={{
              owner: ['wjh', 'zxx'],
            }}
            // onValuesChange={reload}
          >
            <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
              <FormItem name="category">
                <TagSelect expandable>
                  <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                  <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                </TagSelect>
              </FormItem>
            </StandardFormRow>
          </Form>
        </Card>
        <Card key="body" style={{marginTop: '10px'}}>
          <ProTable
            columns={columns}
            rowKey="key"
            request={
              async () => {
                const params: any = {}
                const response = await fetchClassifies(params)
                console.log('response', response)
                return response
              }
            }
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
              <Button key="primary" type="primary">
                新增分类
              </Button>,
            ]}
          />
        </Card>
      </QueueAnim>
    </MainContent>
  );
};

export default Classify;
