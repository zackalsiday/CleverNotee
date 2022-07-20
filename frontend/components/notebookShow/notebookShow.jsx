import React from 'react'

class NotebookShow extends React.Component {
    constructor(props) {
        super(props)
   
    }

    componentDidMount(){
       this.props.fetchNotes()
        
    }

    renderNotes(){
        let notesArray = Object.values(this.props.notes)
        
    }

    render() {

        return (
            <div>
                <h1>We are in the notebookShow component</h1>
               {this.renderNotes()}
            </div>

        )

    }
}

export default NotebookShow
