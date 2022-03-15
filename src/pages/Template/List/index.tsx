import React from "react";
import { history } from "umi";
import { Button, DatePicker, Space, Table, Image, Tag, Popconfirm } from "antd";
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import MainContent from "@/components/MainContent";

const { RangePicker } = DatePicker;

export type TableListItem = {
  key: number;
  name: string;
  img: string;
  platform: string;
  progress: number;
  containers: number;
  callNumber: number;
  creator: string;
  createTime: number;
  isPublish: boolean;
  isLocked: boolean;
  memo: string;
};

const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    platform: 'PC',
    callNumber: Math.floor(Math.random() * 2000),
    progress: Math.ceil(Math.random() * 100) + 1,
    creator: creators[Math.floor(Math.random() * creators.length)],
    createTime: Date.now() - Math.floor(Math.random() * 100000),
    isPublish: true,
    isLocked: false,
    remark: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '模板名称',
    width: 120,
    dataIndex: 'name',
    fixed: 'left',
    render: (_) => <a>{_}</a>
  },
  {
    title: '封面图片',
    width: 120,
    dataIndex: 'img',
    align: 'center',
    search: false,
    render: (img) => <Image
      width={100}
      src={img}
    />
  },
  {
    title: '使用平台',
    width: 120,
    align: 'center',
    dataIndex: 'platform',
  },
  {
    title: '创建者',
    width: 80,
    dataIndex: 'creator',
    valueType: 'select',
    align: 'center',
    valueEnum: {
      all: { text: '全部' },
      付小小: { text: '付小小' },
      曲丽丽: { text: '曲丽丽' },
      林东东: { text: '林东东' },
      陈帅帅: { text: '陈帅帅' },
      兼某某: { text: '兼某某' },
    },
  },
  {
    title: '创建时间',
    width: 260,
    key: 'since',
    dataIndex: 'createTime',
    valueType: 'date',
    align: 'center',
    sorter: (a, b) => a.createTime - b.createTime,
    renderFormItem: () => {
      return <RangePicker />;
    },
  },
  {
    title: '是否发布',
    width: 80,
    dataIndex: 'isPublish',
    align: 'center',
    render: (_) => _ ? <Tag color="success">已发布</Tag> :  <Tag color="error">未发布</Tag>
  },
  {
    title: '是否锁定',
    width: 80,
    dataIndex: 'isLocked',
    align: 'center',
    render: (_) => _ ? <LockOutlined /> : <UnlockOutlined />
  },
  {
    title: '备注',
    dataIndex: 'remark',
    ellipsis: true,
    copyable: true,
    search: false,
    align: 'left'
  },
  {
    title: '操作',
    width: 120,
    key: 'option',
    valueType: 'option',
    fixed: 'right',
    render: () => [
      <a key="link">编辑</a>,
      <Popconfirm title="是否确认删除？" okText="确认" cancelText="取消" placement="topRight">
        <a href="#">删除</a>
      </Popconfirm>,
    ],
  },
];

const TemplateList: React.FC = () => {
  return (
    <MainContent>
      <ProTable<TableListItem>
        // 表格列
        columns={columns}
        // 表格行是否可选择
        rowSelection={{
          // 自定义选择项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        // 自定义批量操作工具栏左侧信息区域, false 时不显示
        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
          </Space>
        )}
        // 自定义批量操作工具栏右侧选项区域, false 时不显示
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <a>批量删除</a>
              <a>导出数据</a>
            </Space>
          );
        }}
        // Table 的数据
        dataSource={tableListDataSource}
        scroll={{ x: 1500 }}
        // 是否显示搜索表单，传入对象时为搜索表单的配置
        search={{
          labelWidth: 'auto',
        }}
        rowKey="key"
        // 渲染工具栏
        toolBarRender={() => [
          <Button type="primary" key="create" onClick={() => history.push("/template/create")}>新建模板</Button>,
          <Button key="show">查看日志</Button>
        ]}
      />
    </MainContent>
  );
}

export default TemplateList;
