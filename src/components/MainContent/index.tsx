import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';

const MainContent: React.FC = (props) => {
  return (
    <PageContainer>
      {
        props.children
      }
    </PageContainer>
  )
}

export default MainContent
