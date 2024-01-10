
import { Plugin } from '@ckeditor/ckeditor5-core';
import { ButtonView } from '@ckeditor/ckeditor5-ui';
/**
 * 创建常规button
 * @param name 按钮名称
 * @returns 
 * this.listenTo(button, 'execute', () => {}) 可以监听激活
 * editor.model.change(writer => { //监听change并插入
        editor.model.insertContent(
            // Create a text node with the abbreviation attribute.
            writer.createText(text, { abbreviation: title })
        );
    });
 */
const commonButton = (name, tip?:any) => {
    return class testButton extends Plugin {
        _chatFlowButton;
        _button
        init() {
            const editor = this.editor as any;
            editor.ui.componentFactory.add(name, () => {
                const button = new ButtonView();
                button.label = '';
                button.tooltip = tip || false
                button.withText = true;                
                editor[`_chatFlow${name}Button`] = button
                this._button =button
                return button;
            });
        }
        afterInit(){
            setTimeout(()=>{
                this._button.element.classList.add('chat-flow-rich-editor-tool-button',`chat-flow-tool-button-${name}`)
                this._button.element.innerHTML = `<div class="wo-button"><button type="button" class="kd-button kd-button-light kd-button-lg kd-button-icon"><i class="kd-icon kd-icon-symbol_cross" style="line-height: 0;"><svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" stroke-width="1.5"><g id="group-0" stroke="#333333" fill="#333333"><path d="M1.75 8H14.25M8 14.25V1.75" stroke-linecap="round" stroke-linejoin="miter" fill="none" vector-effect="non-scaling-stroke"></path></g></svg></i></button></div>`
            })
        }
        
    }
}
export default commonButton
