import React from "react";
import { Card } from "antd";
import QueueAnim from "rc-queue-anim";
import MainContent from "@/components/MainContent";


const TemplateList: React.FC = () => {
  return (
    <MainContent>
      <QueueAnim type="bottom">
        <Card
          style={{ marginBottom: 12 }}
          key="templateHeader"
        >
          123
        </Card>
        <Card
          key="templateBody"
        >
          456
        </Card>
      </QueueAnim>

    </MainContent>
  );
}

export default TemplateList;
