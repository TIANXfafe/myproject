import React from "react";
import { Button, DatePicker, Space, Table, Image } from "antd";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import MainContent from "@/components/MainContent";

const { RangePicker } = DatePicker;

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

const ProcessMap = {
  close: 'normal',
  running: 'active',
  online: 'success',
  error: 'exception',
};

export type TableListItem = {
  key: number;
  name: string;
  progress: number;
  containers: number;
  callNumber: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};

const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    callNumber: Math.floor(Math.random() * 2000),
    progress: Math.ceil(Math.random() * 100) + 1,
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '模版名称',
    width: 120,
    dataIndex: 'name',
    fixed: 'left',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '封面图片',
    width: 120,
    dataIndex: 'containers',
    align: 'center',
    search: false,
    render: () => <Image
      width={100}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    />
  },
  {
    title: '使用平台',
    width: 120,
    align: 'center',
    dataIndex: 'callNumber',
  },
  {
    title: '创建者',
    width: 120,
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
    dataIndex: 'createdAt',
    valueType: 'date',
    align: 'center',
    sorter: (a, b) => a.createdAt - b.createdAt,
    renderFormItem: () => {
      return <RangePicker />;
    },
  },
  {
    title: '备注',
    dataIndex: 'memo',
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
      <a key="link">删除</a>
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
        scroll={{ x: 1300 }}
        // 是否显示搜索表单，传入对象时为搜索表单的配置
        search={{
          labelWidth: 'auto',
        }}
        rowKey="key"
        // 渲染工具栏
        toolBarRender={() => [<Button key="show">查看日志</Button>]}
      />
    </MainContent>
  );
}

export default TemplateList;
