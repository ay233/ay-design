import './index.less'
import React, { useState, useRef, useImperativeHandle } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Bold, Italic, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Link } from '@ckeditor/ckeditor5-link';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar, ImageInsert } from '@ckeditor/ckeditor5-image';
import { LinkImage } from '@ckeditor/ckeditor5-link';
import { Table, TableCellProperties, TableProperties, TableToolbar, TableColumnResize, TableCaption } from '@ckeditor/ckeditor5-table';
import { Font } from '@ckeditor/ckeditor5-font';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
import ChatFlowVariable from './widget/variable/variablePreviewEditing';
import commonBtn from './toolbar/commonBtn';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'
import { defaultConfig } from './constant'
export interface RichEditorProps {
    variables?: {
        renderer: () => void;
    }
    [propName: string]: any
}
const RichEditor: React.ForwardRefRenderFunction<unknown, RichEditorProps> = (props, ref) => {
    const { editorConfig } = props
    const { customButtons, variables } = editorConfig
    const editor = useRef<any>();
    const [editorData, setEditorData] = useState<any>();
    const extendPlugins: any[] = [];
    variables && extendPlugins.push(ChatFlowVariable)
    const defaultPlugins = [
        SimpleUploadAdapter,
        Essentials, Paragraph,
        Font,
        Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, LinkImage, ImageInsert,
        Underline, Heading, Link, Table, TableCellProperties, TableProperties, TableToolbar, Bold, Italic, TableColumnResize, TableCaption
    ]
    customButtons && customButtons.forEach(item => {
        if (item) {
            const name = typeof item === 'object' ? item.name : item
            defaultPlugins.push(commonBtn(name, item?.tip) as any)
        }
    });
    const [editorCfg] = useState<any>({
        plugins: [...defaultPlugins, ...extendPlugins],
        ...(editorConfig || defaultConfig)
    });
    const handleEditorDataChange = (evt, editor) => {
        setEditorData(editor.getData())
    }
    const handleEditorReady = (editView) => {
        editor.current = editView;
        setEditorData(editView.getData())
    }
    useImperativeHandle(
        ref,
        () => ({
            editor
        }),
        []
    );
    return (
        <React.Fragment>
            <div className="innovative-app-rich-editor" key="rich-editor">
                <CKEditor
                    editor={ClassicEditor}
                    data={editorData}
                    config={editorCfg}
                    onChange={handleEditorDataChange}
                    onReady={handleEditorReady}
                    {...props}
                />
                <div dangerouslySetInnerHTML={{ __html: editorData }}>
                </div>
            </div>

        </React.Fragment>
    );
}
export default React.memo(React.forwardRef(RichEditor));