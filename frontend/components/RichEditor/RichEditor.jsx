import React, { Component, useState } from 'react';
import { EditorBlock, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from 'draft-js'
import { convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html'
import NoteEdit from '../noteEdit/noteEdit';
import {ContentState} from "draft-js"
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
class RichEditor extends Component {
    constructor(props) {
        super(props);
        const blocksFromHTML = htmlToDraft(this.props.content);
        const { contentBlocks, entityMap } = blocksFromHTML;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
        this.state = {
            editorState: EditorState.createWithContent(contentState),
            body: this.props.content 
        };
      
    }

    componentDidUpdate(prevProps,prevState){

        
        if (prevProps.noteId !== this.props.noteId) {
            dispatch(this.props.fetchNote(this.props.noteId)).then((res) => {
                const blocksFromHTML = htmlToDraft(this.props.content);
                const { contentBlocks, entityMap } = blocksFromHTML;
                const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
                    this.setState({ editorState: EditorState.createWithContent(contentState) })
                    
            }).then((res) => {
        
                      window.location.reload()
            })
        }


    }



    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
        this.props.updateNote({ content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())), id: this.props.noteId })
    
     
        
    }

 


    render() {
      
        const { editorState } = this.state;
        return (
            <div className='editor'>
                <Editor
                    editorStyle={{ position: 'relative', top: '4.6rem', left: '2.4rem', height: '25rem'}}
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: false },
            
                    }}
                />
            </div>
        )
    }
}

export default RichEditor