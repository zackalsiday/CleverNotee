import React from 'react'
import Link from 'react-router-dom'
import TagsListContainer from '../tagsList/tagsList_container'
class NoteTags extends React.Component {
    constructor(props) {
        super(props)
        this.state = {tagsVisible: false}
        this.toggleTags = this.toggleTags.bind(this)
    }

    renderTags() {
        return (
            <TagsListContainer />
        )
    }

    toggleTags() {
        if (this.state.tagsVisible === false) {
            this.setState({ tagsVisible: true })
        } else {
            this.setState({ tagsVisible: false })
        }

    }


    render() {

        return (
            <div>
                {this.state.tagsVisible === true ? this.renderTags() : ''}
                <button onClick={this.toggleTags}>
                    Tags
                </button> 
            </div>

        )

    }
}

export default NoteTags