import React from 'react'
import { Link } from 'react-router-dom';
import { deleteNotebook } from '../../actions/notebook_actions'

class NotebookItem extends React.Component {
    constructor(props) {
        super(props)
        this.deleteNotebook = this.deleteNotebook.bind(this)
    }
    componentDidMount(){
        console.log(this.state)
    }

    // componentDidUpdate(prevProps, prevState){
    //     if(prevState == this.state){
    //         console.log(this.state)
    //     }
    // }

    deleteNotebook(notebookId){
        this.props.deleteNotebook(notebookId)
    }
    render() {
        return (
            <li>
                <Link to={`/notebooks/${this.props.notebook.id}`}>
                    {this.props.notebook.name}
                </Link>
                {/* <button onClick={() => this.deleteNotebook(this.props.notebook.id)}>Delete</button> */}
                {/* this is commented out because if i delete the notebook it will delete all the notes within it */}
            </li>
        )
    }
}

export default NotebookItem