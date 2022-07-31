import React from 'react'

class TagItem extends React.Component {
    constructor(props) {
        super(props)
        this.deleteTag = this.deleteTag.bind(this)
    }

    componentDidMount() {
        console.log(this.props)
    }

    deleteTag(){
        this.props.deleteTag(this.props.tag.id)
    }

    render() {

        return (
            <div>
                 <li>
                {this.props.tag.name}

                 </li>
                 <button onClick={this.deleteTag}>
                    Delete
                 </button>
            </div>
           
         
        )

    }
}

export default TagItem

