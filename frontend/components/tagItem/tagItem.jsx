import React from 'react'
import { Link } from 'react-router-dom';
class TagItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = { id: this.props.tag.id, name: this.props.tag.name}
        this.deleteTag = this.deleteTag.bind(this)
    }

   componentDidMount(){
       this.props.fetchNoteTags() 
   }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    deleteTag(){
        this.props.deleteTag(this.props.tag.id)
    }
    filteredNotes() {
        let first = Object.values(this.props.noteTags)
        let filteredNoteTags = first.filter(noteTag => noteTag.tag_id.toString() === this.props.tag.id.toString())
        return filteredNoteTags
    }

    firstNote() {
        let reversedNotes = this.filteredNotes().reverse()
        let newObj = Object.assign({}, reversedNotes[0])
        return newObj.note_id
    }


    render() {

        return (
            <li>
                   
                <Link to={`/tags/${this.props.tag.id}/notes/${this.firstNote()}`}>
                    <div onClick={this.props.toggleTags}>{this.props.tag.name}</div>
                </Link>
                    <button onClick={this.deleteTag}>
                             Delete
                    </button>

                    <form onSubmit={() => this.props.updateTag(this.state)}>
                        <input type="text" 
                            value={this.state.name}
                            onChange={this.update('name')}
                            />
                        <input type="submit" 
                            value='submit'
                            />
                    </form>

                 </li>
    
            
                 
          
           
         
        )

    }
}

export default TagItem

