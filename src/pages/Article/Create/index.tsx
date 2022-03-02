import React, { useState } from "react";
import { history } from "umi";
import { Card, Steps, Button, Result } from "antd";
import ProForm, { ProFormText, ProFormTextArea, ProFormTreeSelect, ProFormSelect, ProFormSwitch } from '@ant-design/pro-form';
import { SmileOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import styles from "./index.less"

const { Step } = Steps;

const Create: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);

  const onFinish = () => {
    setCurrent(current + 1)
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
        {/*<QueueAnim type={["bottom", "top"]}>*/}
          {
            current === 0 ? (
              <Card key="firstStep">
                <ProForm submitter={false}>
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
                </ProForm>
              </Card>
            ) : current === 1 ? (
              <Card key="secondStep">第二部</Card>
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
        {/*</QueueAnim>*/}
        {
          current <=1 ? (
            <div className={styles.stepsAction}>
              {
                current === 0 ? (
                  <Button className={styles.stepsBtn} onClick={() => history.goBack()}>取消</Button>

                ) : (
                  <Button type="primary" className={styles.stepsBtn} onClick={() => setCurrent(current - 1)}>上一步</Button>
                )
              }
              {
                current === 0 ? (
                  <Button type="primary" className={styles.stepsBtn} onClick={onFinish}>下一步</Button>
                ) : (
                  <Button type="primary" className={styles.stepsBtn} onClick={() => setCurrent(current + 1)}>下一步</Button>
                )
              }
            </div>
          ) : ("")
        }

      </Card>
    </QueueAnim>
  )
}

export default Create;
