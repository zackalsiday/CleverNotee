import React from 'react'
import { Link } from 'react-router-dom';
import { RiDeleteBin6Line} from 'react-icons/ri'
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
        window.location.reload()
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
            <li className='tags-list-container'>
            <div className='tags-list'>
                    <Link className='tags-list-link' to={`/tags/${this.props.tag.id}/notes/${this.firstNote()}`}>
                    <div className='tags-list-name' onClick={this.props.toggleTags}>{this.props.tag.name}</div>
                </Link>
                    <button className='tag-list-delete-but' onClick={this.deleteTag}>
                             <RiDeleteBin6Line color='red' size='1rem'/>
                    </button>
            </div>
            

                    <form className='edit-tag-form'onSubmit={() => this.props.updateTag(this.state)}>
                        <input type="text" 
                            value={this.state.name}
                            onChange={this.update('name')}
                            className='rename-tag-input'
                            />
                        <input type="submit" 
                            value='rename'
                            className='rename-tag-but'
                            />
                    </form>

                 </li>
    
            
                 
          
           
         
        )

    }
}

export default TagItem

