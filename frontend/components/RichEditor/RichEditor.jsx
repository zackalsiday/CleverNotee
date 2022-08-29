import React, { Component, useState } from 'react';
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
// import './EditorContainer.css'
class RichEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            body: 'fasdfasd'
        };
    }

    onEditorStateChange = (editorState) => {
        // console.log(editorState)
        this.setState({
            editorState,
        });
     
    };
  


    render() {
        const { editorState } = this.state;
       
        return (
            <div className='editor'>
                {/* {console.log(this.state)} */}
                {/* {console.log(this.state.editorState.getCurrentInlineStyle().blocks)} */}
                {
                    // console.log(stateToHTML(this.state.editorState.getCurrentContent()))
                    // console.log(convertToRaw(this.state.editorState.getCurrentContent()).blocks[0].text)
                }
            
                <form action="">

                    <input type="text"
                        value={stateToHTML(this.state.editorState.getCurrentContent())}
                        // value={this.state.editorState.getCurrentContent().blocks[0].text}
                    />
                </form>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        // image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                    }}
                />
            </div>
        )
    }
}

export default RichEditor