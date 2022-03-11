import React, { useState } from "react";
import Editor from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { emojis } from "../../utils/data";

const MarkDownEdit: React.FC = (props) => {
  const [md, setMd] = useState<string>('');
  const [emojiVisible, setEmojiVisible] = useState<boolean>(false);

  const markHandler = () => {
    // 获取输入框
    const textarea = document.querySelector('#md-prev-textarea') as HTMLTextAreaElement;
    // 获取选中的内容
    const selection = window.getSelection()?.toString();
    // 获取鼠标位置
    const endPoint = textarea.selectionStart;

    // 生成标记文本
    const markStr = `@${selection}@`;

    // 根据鼠标位置分割旧文本
    // 前半部分
    const prefixStr = textarea.value.substring(0, endPoint);
    // 后半部分
    const suffixStr = textarea.value.substring(endPoint + (selection?.length || 0));

    setMd(`${prefixStr}${markStr}${suffixStr}`);

    setTimeout(() => {
      textarea.setSelectionRange(endPoint, markStr.length + endPoint);
      textarea.focus();
    }, 0);
  };

  const emojiHandler = (emoji: string) => {
    // 获取输入框
    const textarea = document.querySelector('#md-prev-textarea') as HTMLTextAreaElement;
    // 获取选中的内容
    const selection = window.getSelection()?.toString();
    // 获取鼠标位置
    const endPoint = textarea.selectionStart;

    // 根据鼠标位置分割旧文本
    // 前半部分
    const prefixStr = textarea.value.substring(0, endPoint);
    // 后半部分
    const suffixStr = textarea.value.substring(endPoint + (selection?.length || 0));

    setMd(`${prefixStr}${emoji}${suffixStr}`);

    setTimeout(() => {
      textarea.setSelectionRange(endPoint, endPoint + 1);
      textarea.focus();
    }, 0);
  };

  return (
    <div className="project-preview">
      <div className="container">
        <Editor
          modelValue={md}
          editorId="md-prev"
          defToolbars={[
            <Editor.NormalToolbar
              title="mark"
              trigger={
                <svg className="md-icon" aria-hidden="false">
                  <use xlinkHref="#icon-mark"></use>
                </svg>
              }
              onClick={markHandler}
              key="mark-toolbar"
            ></Editor.NormalToolbar>,
            <Editor.DropdownToolbar
              title="emoji"
              visible={emojiVisible}
              onChange={setEmojiVisible}
              overlay={
                <>
                  <div className="emoji-container">
                    <ol className="emojis">
                      {emojis.map((emoji, index) => (
                        <li
                          key={`emoji-${index}`}
                          onClick={() => {
                            emojiHandler(emoji);
                          }}
                        >
                          {emoji}
                        </li>
                      ))}
                    </ol>
                  </div>
                </>
              }
              trigger={
                <svg className="md-icon" aria-hidden="false">
                  <use xlinkHref="#icon-emoji"></use>
                </svg>
              }
              key="emoji-toolbar"
            ></Editor.DropdownToolbar>
          ]}
          toolbars={[
            'bold',
            'underline',
            'italic',
            'strikeThrough',
            '-',
            'title',
            'sub',
            'sup',
            'quote',
            'unorderedList',
            'orderedList',
            '-',
            'codeRow',
            'code',
            'link',
            'image',
            'table',
            'mermaid',
            'katex',
            0,
            1,
            '-',
            'revoke',
            'next',
            'save',
            '=',
            'prettier',
            'pageFullscreen',
            'fullscreen',
            'preview',
            'htmlPreview',
            'catalog',
            'github'
          ]}
          onChange={(value: string) => setMd(value)}
        />
      </div>
    </div>
  );
}

export default MarkDownEdit;
