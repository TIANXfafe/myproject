import React, {useState} from "react";
import { history } from "umi";
import {Button, Card, message, Result, Steps} from "antd";
import ProForm, { ProFormText, ProFormTextArea, ProFormUploadDragger, ProFormRadio, ProFormSwitch, ProFormDependency } from '@ant-design/pro-form';
import {SmileOutlined} from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import DragDrop from "./components/DragDrop";
import styles from "./index.less";

const { Step } = Steps;

const Create: React.FC = () => {
  const [current, setCurrent] = useState<number>(1);
  const [platform, setPlatform] = useState<string>("pc");

  const onFinish = async (values: any) => {
    setPlatform(values.platform)
    if (values.password !== values.confirmPassword) message.warning('两次输入密码不一致，请重新输入！');
    else setCurrent(current + 1)
  }

  return (
    <QueueAnim type="bottom">
      <Card key="stepTitle">
        <Steps current={current}>
          <Step title="基本信息" />
          <Step title="模板内容" />
          <Step title="结果" />
        </Steps>
      </Card>
      <Card key="stepBody" className={styles.stepBody}>
        {
          current === 0 ? (
            <Card>
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
                  name="name"
                  label="模板名称"
                  placeholder="请输入模板名称!"
                  rules={[{ required: true, message: '请输入模板名称！' }]}
                />
                <ProFormUploadDragger
                  rules={[{ required: true, message: '请上传封面图片！' }]}
                  label="封面图片"
                  name="img"
                  title="单击或拖动图片到此区域进行上传"
                  description="最多上传一张图片"
                  action="upload.do"
                  accept=".jpg,.png,.gif,.jpeg"
                />
                <ProFormRadio.Group
                  label="使用平台"
                  name="platform"
                  initialValue="c"
                  options={[
                    {
                      label: "item 1",
                      value: "pc"
                    },
                    {
                      label: "item 1",
                      value: "miniProgram"
                    },
                    {
                      label: "item 1",
                      value: "android"
                    },
                    {
                      label: "item 1",
                      value: "ios"
                    }
                  ]}
                />
                <ProFormTextArea
                  name="remark"
                  label="备注"
                  placeholder="请输入备注!"
                />
                <ProFormSwitch
                  name="isPublish"
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
            <Card>
              <h3 key="editHeader">模板内容</h3>
              {
                platform === "pc" ? (
                  <div><DragDrop /></div>
                ) : platform === "miniProgram" ? (
                  <div>miniProgram</div>
                ) : platform === "android" ? (
                  <div>android</div>
                ) : (
                  <div>ios</div>
                )
              }
              <div>
                123
              </div>
              <div key="editFoot">
                <Button className={styles.stepsBtn} onClick={() => setCurrent(current - 1)}>上一步</Button>
                <Button type="primary" className={styles.stepsBtn} onClick={() => setCurrent(current + 1)}>下一步</Button>
              </div>
            </Card>
          ) : (
            <Card key="thirdStep">
              <Result
                icon={<SmileOutlined />}
                title="创建成功！"
                extra={<Button type="primary" onClick={() => history.push("/template/list")}>完成</Button>}
              />,
            </Card>
          )
        }
      </Card>
    </QueueAnim>
  );
}

export default Create;
