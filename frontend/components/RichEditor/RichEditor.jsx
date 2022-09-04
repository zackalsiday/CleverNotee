import React, { Component, useState } from 'react';
import { EditorBlock, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from 'draft-js'
import { convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html'
import NoteEdit from '../noteEdit/noteEdit';
import {ContentState} from "draft-js"
// import './EditorContainer.css'
class RichEditor extends Component {
    constructor(props) {
        super(props);
        const blocksFromHTML = convertFromHTML(this.props.content);
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
        );

        this.state = {
            editorState: EditorState.createWithContent(state),
            body: this.props.content 
        };
      
    }
    // componentDidMount(){
    //     console.log(this.state)
    // }

    // componentDidUpdate(prevState, prevProps){
    //     if (prevState == this.state){
    //         dispatch(this.props.updateNote(noteId)).then((res) => {
    //             const blocksFromHTML = convertFromHTML(res.note.content);
    //             const state = ContentState.createFromBlockArray(
    //                 blocksFromHTML.contentBlocks,
    //                 blocksFromHTML.entityMap,
    //             );
    //             this.setState({editorState: EditorState.createWithContent(state)})
    //         })
    //     }else if (prevProps === this.props){
    //         dispatch(this.props.fetchNote(noteId)).then((res) => {
    //             dispatch(this.props.updateNote(noteId)).then((res) => {
    //                 const blocksFromHTML = convertFromHTML(res.note.content);
    //                 const state = ContentState.createFromBlockArray(
    //                     blocksFromHTML.contentBlocks,
    //                     blocksFromHTML.entityMap,
    //                 );
    //                 this.setState({ editorState: EditorState.createWithContent(state) })
    //             })
    //         })
    //     }
    // }

    componentDidUpdate(prevProps){
        // console.log(prevProps.noteId )
        // console.log(this.props.noteId)
        if (prevProps.noteId !== this.props.noteId) {
            dispatch(this.props.fetchNote(this.props.noteId)).then((res) => {
               
                    const blocksFromHTML = convertFromHTML(res.note.content);
                    const state = ContentState.createFromBlockArray(
                        blocksFromHTML.contentBlocks,
                        blocksFromHTML.entityMap,
                    );
                    this.setState({ editorState: EditorState.createWithContent(state) })
                    
            }).then((res) => {
                console.log(this.props)
            })
        } 
    }

//     if(prevProps === this.props) {
//     dispatch(this.props.fetchNote(noteId)).then((res) => {
//         dispatch(this.props.updateNote(noteId)).then((res) => {
//             const blocksFromHTML = convertFromHTML(res.note.content);
//             const state = ContentState.createFromBlockArray(
//                 blocksFromHTML.contentBlocks,
//                 blocksFromHTML.entityMap,
//             );
//             this.setState({ editorState: EditorState.createWithContent(state) })
//         })
//     })
// }


    onEditorStateChange = (editorState) => {
        // console.log(editorState)
        //  this.props.changeContent(stateToHTML(this.state.editorState.getCurrentContent()))
        this.setState({
            editorState
        })
              this.props.updateNote({ content: stateToHTML(this.state.editorState.getCurrentContent()), id: this.props.noteId })
    
     
        
    }

    // updateNote(newContent){
    //   this.props.updateNote({id: this.props.noteId, content: newContent })
    // }
  


    render() {
      
        const { editorState } = this.state;
        // <NoteEdit editorState={this.state.editorState}/>
        return (
            <div className='editor'>
                {/* {console.log(this.props.noteId)} */}
                
                {/* {console.log(this.state.editorState.getCurrentInlineStyle().blocks)} */}
                {
                    // console.log(stateToHTML(this.state.editorState.getCurrentContent()))
                    // console.log(convertToRaw(this.state.editorState.getCurrentContent()).blocks[0].text)
                }
                <form action="">

                    <input type="text"
                        value={stateToHTML(this.state.editorState.getCurrentContent())}
                        // onChange={ () => this.props.updateNote({content: stateToHTML(this.state.editorState.getCurrentContent()), id:this.props.noteId})}
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
                        history: { inDropdown: false },
            
                        // image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                    }}
                />
            </div>
        )
    }
}

export default RichEditor