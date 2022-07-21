import React from 'react'

class NoteForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            content: '',
            author_id: this.props.currentUser.id,
            notebook_id: 2
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const note = Object.assign({}, this.state)
        this.props.createNote(note)
        this.setState({title: '', content: ''})
    }

    render(){
        return(
            
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

export default NoteForm