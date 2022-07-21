import React from 'react'

class NotebookShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            author_id: parseInt(this.props.currentUser.id),
            notebook_id: parseInt(this.props.match.params.notebook_id)
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
       this.props.fetchNotes()
        console.log(this.props)
    }

    renderNotes(){
        let notesArray = Object.values(this.props.notes)
        let filteredNotes = notesArray.filter(note => note.notebookId.toString() === this.props.match.params.notebook_id.toString())
        return(
            <ul>
                {filteredNotes.map((note) => (
                    <li>{note.title}</li>
                ))}
            </ul>
        )
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const note = Object.assign({}, this.state)
        this.props.createNote(note)
        this.setState({ title: '', content: '' })
    }

    render() {

        return (
            <div>
               {this.renderNotes()}
                <form onSubmit={this.handleSubmit}>
                    <input type="text"
                        value={this.state.title}
                        placeholder='please title your note'
                        onChange={this.update('title')}
                    />
                    <br />
                    <input
                        type="text"
                        value={this.state.content}
                        placeholder='take notes here'
                        onChange={this.update('content')}
                    />

                    <input type="submit"
                        value='submit'
                    />
                </form>
            </div>

        )

    }
}

export default NotebookShow
