import React from 'react'
import TagItemContainer from '../tagItem/tagItem_container'
class TagsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', user_id: this.props.currentUser}
        this.createTag = this.createTag.bind(this)
    }
    componentDidMount(){
        dispatch(this.props.fetchTags())
        console.log(this.state)
    }

    renderTags(){
        let tagsArray = Object.values(this.props.tags)
        return(
            <ul>
                {tagsArray.map((tag) => (
                    <TagItemContainer tag={tag} updateTag={this.props.updateTag}/>
                ))}
            </ul>
        )
    }

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
                    />
            <input type="submit" 
                    value='submit'
            />
            </form>
        )
    }

    render() {

        return (
            <div>
                {this.renderTags()}
                {this.renderTagsForm()}
            </div>

        )

    }
}

export default TagsList

