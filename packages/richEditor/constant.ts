const defaultConfig = {
    toolbar: {
        items: [
            'heading',
            'fontSize', 'fontColor', 'fontBackgroundColor',
            'bold', 'italic', 'underline',
            'link', 'insertTable',
            'insertImage',
            'undo', 'redo'
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
            'default',
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
    language: 'zh-cn',
}
export { defaultConfig }