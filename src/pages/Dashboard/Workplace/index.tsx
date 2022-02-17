import React, {useEffect, useState} from "react";
import { Link } from "umi";
import { Row, Col, Card, Avatar, notification } from "antd";
import QueueAnim from "rc-queue-anim";
import MainContent from "@/components/MainContent";
import { queryProjectNotice } from "@/services/Dashboard/workplace";
import moment from "moment";
import styles from "./index.less";

interface projectNoticeRes {
  code: number;
  data: any;
  message: string
}
interface projectNoticeItem {
  id: string;
  logo: string;
  href: string;
  title: string;
  description: string;
  memberLink: string;
  member: string;
  updatedAt: string;
}

const Workplace: React.FC = () => {
  // 所有项目
  const [projectNotice, setProjectNotice] = useState<any[]>([]);

  /**
   * 获取所有项目
   */
  const fetchProjectNotice = async() => {
    // @ts-ignore
    const res: projectNoticeRes = await queryProjectNotice()
    if (res.code === 200) {
      setProjectNotice(res.data)
    } else {
      notification.error({
        message: `错误码${res.code}`,
        description: res.message
      })
    }
  }

  useEffect(() => {
    fetchProjectNotice()
  }, [])

  return (
    <MainContent>
      <QueueAnim type="right">
        <Row gutter={24} key="mainContent">
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <QueueAnim type="bottom">
              <Card
                className={styles.projectList}
                style={{ marginBottom: 24 }}
                title="进行中的项目"
                bordered={false}
                extra={<Link to="/">全部项目</Link>}
                bodyStyle={{ padding: 0 }}
                key="1"
              >
                {
                  projectNotice.length && projectNotice.map((item: projectNoticeItem) => (
                    <Card.Grid className={styles.projectGrid} key={item.id}>
                      <Card bodyStyle={{ padding: 0 }} bordered={false}>
                        <Card.Meta
                          title={
                            <div className={styles.cardTitle}>
                              <Avatar size="small" src={item.logo} />
                              <Link to={item.href}>{item.title}</Link>
                            </div>
                          }
                          description={item.description}
                        />
                        <div className={styles.projectItemContent}>
                          <Link to={item.memberLink}>{item.member || ''}</Link>
                          {item.updatedAt && (
                            <span className={styles.datetime} title={item.updatedAt}>
                        {moment(item.updatedAt).fromNow()}
                      </span>
                          )}
                        </div>
                      </Card>
                    </Card.Grid>
                  ))
                }
              </Card>
              <Card key="2">123</Card>
              <Card key="3">123</Card>
            </QueueAnim>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <QueueAnim type="bottom">
              <Card>456</Card>
            </QueueAnim>
          </Col>
        </Row>
      </QueueAnim>
    </MainContent>
  );
}

export default Workplace;
