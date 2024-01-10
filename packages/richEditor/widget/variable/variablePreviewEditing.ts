import { Plugin } from '@ckeditor/ckeditor5-core';
import { Widget, toWidget } from '@ckeditor/ckeditor5-widget';

import InsertVariablePreviewCommand from './insertVaribablePreviewCommand';

export default class variablePreviewEditing extends Plugin {
    static get requires() {
        return [Widget];
    }

    init() {
        this._defineSchema();
        this._defineConverters();
        this.editor.commands.add('insertVariable', new InsertVariablePreviewCommand(this.editor));
    }

    _defineSchema() {
        const schema = this.editor.model.schema;
        schema.register('variablePreview', {
            inheritAllFrom: '$inlineObject',
            allowAttributes: ['id']
        });
    }

    _defineConverters() {
        const editor = this.editor;
        const conversion = editor.conversion;
        const renderProduct = (editor.config.get('variables') as any).renderer;
        conversion.for('upcast').elementToElement({
            view: {
                name: 'span',
                classes: 'variable'
            },
            model: (viewElement, { writer: modelWriter }) => {
                return modelWriter.createElement('variablePreview', {
                    id: viewElement.getAttribute('data-id')
                });
            }
        });
        //返回值
        conversion.for('dataDowncast').elementToElement({
            model: 'variablePreview',
            view: (modelElement, { writer: viewWriter }) => {
                return viewWriter.createEmptyElement('span', {
                    class: 'variable',
                    'data-id': modelElement.getAttribute('id')
                });
            }
        });
        //编辑值
        conversion.for('editingDowncast').elementToElement({
            model: 'variablePreview',
            view: (modelElement, { writer: viewWriter }) => {
                const id = modelElement.getAttribute('id');
                const span = viewWriter.createContainerElement('span', {
                    class: 'variable',
                    'data-id': id
                });
                const reactWrapper = viewWriter.createRawElement('span', {
                    class: 'variable__react-wrapper'
                }, function (domElement) {
                    renderProduct(id, domElement);
                });

                viewWriter.insert(viewWriter.createPositionAt(span, 0), reactWrapper);

                return toWidget(span, viewWriter, { label: 'variable preview widget' });
            }
        });
    }
}
