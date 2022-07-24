import React from 'react'

class NoteForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            content: '',
            author_id: this.props.currentUser.id,
            notebook_id: 1
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){

        this.props.fetchNotebooks().then((res) => {
            console.log(res)
        })
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



    notebookOptions(){
        let notebooksArray = Object.values(this.props.notebooks)

        
        
        return(
            <select value={this.state.notebook_id} onChange={this.update('notebook_id')} >
                
                {notebooksArray.map((notebook) => (
                    <option value={notebook.id}>{notebook.name}</option>
                ))}
            </select>
        )

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
            <br />
             {this.notebookOptions()}
            <br />
             <input type="submit" 
             value='submit'
             />
         </form>
                
        </div>
  
        )
    }

    
}

export default NoteForm