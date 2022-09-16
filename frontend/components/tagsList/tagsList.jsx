import React from 'react'
import TagItemContainer from '../tagItem/tagItem_container'
class TagsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', user_id: this.props.currentUser, tags_visible: true}
        this.createTag = this.createTag.bind(this)
        // this.toggleTags = this.toggleTags.bind(this)
    }
    componentDidMount(){
        dispatch(this.props.fetchTags())
    }

    renderTags(){
        let tagsArray = Object.values(this.props.tags)
        return(
            <ul>
                {tagsArray.map((tag) => (
                     <div><TagItemContainer  toggleTags={this.props.toggleTags} tag={tag} updateTag={this.props.updateTag}/></div>
                ))}
            </ul>
        )
    }

    // toggleTags(){
    //     if(this.state.tags_visible === true){
    //         this.setState({tags_visible: false})
    //     }else{
    //         this.setState({tags_visible: true})
    //     }
    // }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    createTag(){
        const tag = Object.assign({}, this.state)
        this.props.createTag(tag)
        this.setState({name: ''})
    }

    renderTagsForm(){
        return(
            <form onSubmit={this.createTag}>
                <input type="text" 
                        value={this.state.name}
                        onChange={this.update('name')}
                        className='new-tag-input'
                        />
                <input type="submit" 
                        value='submit'
                />
            </form>
        )
    }

    render() {

        return (
            <div className='tags-container'>
                {/* {console.log(this.state)} */}
                <div className='tags-header'>Tags</div>
                {this.state.tags_visible === true? this.renderTagsForm() : ''}
                {this.state.tags_visible === true ? this.renderTags() : ''}
            </div>

        )

    }
}

export default TagsList

