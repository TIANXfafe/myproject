import React from "react";
import {Card, Space, Button, Divider, Tag, Checkbox, message} from "antd";
import {ModalForm, ProFormText} from "@ant-design/pro-form";
import {PlusOutlined, DeleteOutlined} from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import MainContent from "@/components/MainContent";
import styles from "./index.less";

const colorGroup: string[] = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple"
]

const TagList: React.FC = () => {

  const onChange = (e: any) => {
    console.log(`checked = ${e.target.checked}`);
  }

  return (
    <MainContent>
      <Card>
        <QueueAnim type="bottom">
          <div key="tagHeader" className={styles.tagHeader}>
            <Space>
              <Checkbox onChange={onChange} indeterminate={true}><span>已勾选10项</span></Checkbox>
              <Button type="primary" danger>删除<DeleteOutlined /></Button>
              <ModalForm
                key="primary"
                title="新增标签"
                width="400px"
                trigger={
                  <Button type="primary">
                    新增标签
                    <PlusOutlined />
                  </Button>
                }
                autoFocusFirstInput
                onFinish={async (values) => {
                  console.log(values);
                  message.success('提交成功');
                  return true;
                }}
              >
                <ProFormText
                  name="classifyName"
                  label="标签名称"
                  placeholder="请输入标签名称！"
                  rules={[{ required: true, message: '请输入标签名称！' }]}
                />
              </ModalForm>
            </Space>
          </div>
          <Divider />
          <div key="tagBody">
            <QueueAnim type="right" className={styles.tagBody}>
              <div key="1" className={styles.tagItem}>
                <div className={styles.tagCheckbox}><Checkbox /></div>
                <div className={styles.tagBox}>
                  <Tag color={colorGroup[Math.floor(Math.random()*11)]}>red</Tag>
                </div>
              </div>
              <div key="2" className={styles.tagItem}>
                <div className={styles.tagCheckbox}><Checkbox /></div>
                <div className={styles.tagBox}>
                  <Tag color={colorGroup[Math.floor(Math.random()*11)]}>magenta</Tag>
                </div>
              </div>
              <div key="3" className={styles.tagItem}>
                <div className={styles.tagCheckbox}><Checkbox /></div>
                <div className={styles.tagBox}>
                  <Tag color={colorGroup[Math.floor(Math.random()*11)]}>purple</Tag>
                </div>
              </div>
              <div key="4" className={styles.tagItem}>
                <div className={styles.tagCheckbox}><Checkbox /></div>
                <div className={styles.tagBox}>
                  <Tag color={colorGroup[Math.floor(Math.random()*11)]}>gold</Tag>
                </div>
              </div>
            </QueueAnim>
          </div>
        </QueueAnim>
      </Card>
    </MainContent>
  );
}

export default TagList;
