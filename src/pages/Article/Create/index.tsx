import React, { useState } from "react";
import { history } from "umi";
import { Card, Steps, Button, Result, message } from "antd";
import ProForm, { ProFormText, ProFormTextArea, ProFormTreeSelect, ProFormSelect, ProFormSwitch, ProFormDependency } from '@ant-design/pro-form';
import { SmileOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import Editor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import sanitizeHtml from 'sanitize-html';
import styles from "./index.less"

const { Step } = Steps;

const Create: React.FC = () => {
  // 当前步骤
  const [current, setCurrent] = useState<number>(1);
  // 编辑器内容
  const [content, setContent] = useState<string>("");
  // 编辑器预览内容主题
  const [previewTheme] = useState<string>("github");
  // 编辑器目录获取
  const [catalogList, setList] = useState([]);

  const onFinish = async (values: any) => {
    if (values.password !== values.confirmPassword) message.warning('两次输入密码不一致，请重新输入！');
    else setCurrent(current + 1)
  }

  return (
    <QueueAnim type="bottom">
      <Card key="stepTitle">
        <Steps current={current}>
          <Step title="基本信息" />
          <Step title="文章内容" />
          <Step title="结果" />
        </Steps>
      </Card>
      <Card key="stepBody" className={styles.stepBody}>
        {
          current === 0 ? (
            <Card key="firstStep">
              <ProForm
                onFinish={onFinish}
                onReset={() => history.goBack()}
                submitter={{
                  searchConfig: {
                    resetText: "上一步",
                    submitText: "下一步"
                  },
                }}
              >
                <ProFormText
                  name="title"
                  label="文章标题"
                  placeholder="请输入文章标题!"
                  rules={[{ required: true, message: '请输入文章标题！' }]}
                />
                <ProFormTextArea
                  name="desc"
                  label="文章介绍"
                  placeholder="请输入文章介绍!"
                />
                <ProFormTreeSelect
                  name="classify"
                  label="文章分类"
                  allowClear
                  request={async () => {
                    return [
                      {
                        title: '一级分类1',
                        value: 'yiji1',
                        children: [
                          {
                            title: '二级分类1',
                            value: 'erji1'
                          },
                          {
                            title: '二级分类2',
                            value: 'erji2'
                          }
                        ]
                      },
                      {
                        title: '一级分类2',
                        value: 'yiji2'
                      },
                    ]
                  }}
                  placeholder="请选择文章分类！"
                  rules={[{ required: true, message: '请选择文章分类！' }]}
                />
                <ProFormSelect
                  mode="multiple"
                  name="tag"
                  label="文章标签"
                  allowClear
                  request={async () => [
                    { label: '全部', value: 'all' },
                    { label: '未解决', value: 'open' },
                    { label: '已解决', value: 'closed' },
                    { label: '解决中', value: 'processing' },
                  ]}
                />
                <ProFormSwitch
                  name="status"
                  label="是否发布"
                />
                <ProFormSwitch
                  name="isLocked"
                  label="是否锁定"
                />
                <ProFormDependency name={['isLocked']}>
                  {({ isLocked }) => {
                    if (isLocked) {
                      return (
                        <>
                          <ProFormText.Password
                            name="password"
                            label="密码"
                            rules={[{ required: true, message: '请输入密码！' }]}
                          />
                          <ProFormText.Password
                            name="confirmPassword"
                            label="确认密码"
                            rules={[{ required: true, message: '请再次输入密码！' }]}
                          />
                        </>
                      );
                    } else return null
                  }}
                </ProFormDependency>
              </ProForm>
            </Card>
          ) : current === 1 ? (
            <Card key="secondStep">
              <QueueAnim type="bottom">
                <h3 key="editHeader">文章内容</h3>
                <Editor
                  key="editBody"
                  modelValue={content}
                  onChange={setContent}
                  previewTheme={previewTheme}
                  onGetCatalog={setList}
                  showCodeRowNumber={true}
                  sanitize={(html) => sanitizeHtml(html)}
                />
                <div key="editFoot">
                  <Button className={styles.stepsBtn} onClick={() => setCurrent(current - 1)}>上一步</Button>
                  <Button type="primary" className={styles.stepsBtn} onClick={() => setCurrent(current + 1)}>下一步</Button>
                </div>

              </QueueAnim>
            </Card>
          ) : (
            <Card key="thirdStep">
              <Result
                icon={<SmileOutlined />}
                title="创建成功！"
                extra={<Button type="primary" onClick={() => history.push("/article/list")}>完成</Button>}
              />,
            </Card>
          )
        }
      </Card>
    </QueueAnim>
  )
}

export default Create;
