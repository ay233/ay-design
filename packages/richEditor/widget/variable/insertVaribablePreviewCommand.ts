import { Command } from '@ckeditor/ckeditor5-core';

export default class InsertProductPreviewCommand extends Command {
    execute(id) {
        this.editor.model.change(writer => {
            this.editor.model.insertContent(writer.createElement('variablePreview', { id }));
        });
    }

    refresh() {
        const model = this.editor.model;
        const selection: any = model.document.selection;
        const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'variablePreview');
        this.isEnabled = allowedIn !== null;
    }
}
