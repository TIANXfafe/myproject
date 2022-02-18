import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';

interface Props {
  content?: React.ReactNode,
  extraContent?: React.ReactNode
}

const MainContent: React.FC<Props> = ({
  content,
  extraContent,
  children
}) => {
  return (
    <PageContainer
      content={content}
      extraContent={extraContent}
    >
      {children}
    </PageContainer>
  )
}

export default MainContent
