import React from 'react'
class NoteEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            author_id: '',
            notebook_id: '',
            id: ''
        }
        // this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        dispatch(this.props.fetchNote(this.props.match.params.id)).then((res) => {
            this.setState({
                title: res.note.title,
                content: res.note.content,
                author_id: res.note.authorId,
                notebook_id: res.note.notebookId,
                id: res.note.id
            })
        })
        console.log(this.state)
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.match.params.id != this.props.match.params.id) {
            dispatch(this.props.fetchNote(this.props.match.params.id)).then((res) => {
                this.setState({
                    title: res.note.title,
                    content: res.note.content,
                    author_id: res.note.authorId,
                    notebook_id: res.note.notebookId,
                    id: res.note.id
                })
            })
            const note = Object.assign({}, this.state)
            this.props.updateNote(note)
        }else if(prevState.title != this.state.title) {
            const note = Object.assign({}, this.state)
            this.props.updateNote(note)
        }else if(prevState.content != this.state.content){
            const note = Object.assign({}, this.state)
            this.props.updateNote(note)
        }else if (prevState.notebook_id != this.state.notebook_id){
            const note = Object.assign({}, this.state)
            this.props.updateNote(note)
        }
        console.log(this.state)
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    // handleSubmit(e){
    //     e.preventDefault();
    //     const note = Object.assign({}, this.state)
    //     this.props.updateNote(note)
    // }

   

  


    render() {
        return (
            <div>
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

export default NoteEdit 

