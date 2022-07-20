

import * as NotebooksApiUtil from '../util/notebooks_api_util';

export const RECEIVE_NOTEBOOKS = 'RECEIVE_NOTEBOOKS';
export const RECEIVE_NOTEBOOK = 'RECEIVE_NOTEBOOK';
export const REMOVE_NOTEBOOK = 'REMOVE_NOTEBOOK';


const receiveNotebooks = (notebooks) => ({
    type: RECEIVE_NOTEBOOKS,
    notebooks
})

const receiveNotebook = (notebook) => ({
    type: RECEIVE_NOTEBOOK,
    notebook
})

const removeNotebook = (notebookId) => ({
    type: REMOVE_NOTEBOOK,
    notebookId
})



export const fetchNotebooks = () => (dispatch) => {
    return NotebooksApiUtil.fetchNotebooks()
        .then(notebooks => dispatch(receiveNotebooks(notebooks)))
}

export const fetchNotebook = (notebookId) => (dispatch) => {
    return NotebooksApiUtil.fetchNotebook(notebookId)
        .then(({ notebook, notes }) => dispatch(receiveNotebook(notebook, notes)))
}


export const createNotebook = (notebook) => (dispatch) => {
    return NotebooksApiUtil.createNotebook(notebook)
        .then(notebook => dispatch(receiveNotebook(notebook)))
}

export const updateNotebook = (notebook) => (dispatch) => {
    return NotebooksApiUtil.updateNotebook(notebook)
        .then(notebook => dispatch(receiveNotebook(notebook)))
}

export const deleteNotebook = (notebookId) => (dispatch) => {
    return NotebooksApiUtil.deleteNotebook(notebookId)
        .then(() => dispatch(removeNotebook(notebookId)))
}