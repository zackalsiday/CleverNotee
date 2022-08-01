import React from 'react'

class TagItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = { id: this.props.tag.id, name: this.props.tag.name}
        this.deleteTag = this.deleteTag.bind(this)
    }

    componentDidMount() {
        console.log(this.props)
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    deleteTag(){
        this.props.deleteTag(this.props.tag.id)
    }

    render() {

        return (
          
                 <li>
                    {this.props.tag.name}
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

