import React from 'react'
import ReactDOM from 'react-dom'
import { RichEditor } from '../packages'
import './index.css'
const variables = {
    renderer: (id: string, domElement: HTMLElement) => {
        ReactDOM.render(<span>变量</span>, domElement)
    }
}
const editorConfig = {
    toolbar: {
        items: [
            'heading',
            'fontSize', 'fontColor', 'fontBackgroundColor',
            'bold', 'italic', 'underline',
            'link', 'insertTable',
            'insertImage',
            'undo', 'redo',
            'Variable'
        ],
        shouldNotGroupWhenFull: true
    },
    table: {
        contentToolbar: [
            'toggleTableCaption', 'tableColumn', 'tableRow', 'mergeTableCells',
            'tableProperties', 'tableCellProperties'
        ],
        defaultHeadings: { rows: 1, columns: 1 }//没生效
    },
    fontSize: {
        options: [
            9,
            11,
            13,
            15,
            17,
            19,
            21
        ]
    },
    image: {
        toolbar: [
            'imageStyle:block',
            'imageStyle:side',
            '|',
            'toggleImageCaption',
            'imageTextAlternative',
            '|',
            'linkImage'
        ],
        insert: {
            type: 'auto'
        }
    },
    variables,
    language: 'zh-cn',
    customButtons:['Variable']
}
ReactDOM.render(<div>
    <RichEditor
    onBlur={(event, editor) => {
        console.log('Blur.', editor);
    }}
    onFocus={(event, editor) => {
        console.log('Focus.', editor);
    }}
    editorConfig={editorConfig}
    />
</div>, document.getElementById('root')!)