
import React from "react";
import NoteEdit from "./noteEdit/noteEdit";

class Check extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            myName: 'zackioi'
        }
    }


    render() {
        return (
            <div>
                <NoteEdit my={this.state.myName}/>

            </div>
        )
    }
}



export default Check