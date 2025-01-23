import {html, render} from '../node_modules/lit-html/lit-html.js';
import { origin } from "./config.js"

import { Main } from './components/Main.js';
console.log({ key: localStorage.getItem('teamworkKey' )})
export const updateDOM = async (appData) => {
    const contentArea = document.querySelector('body')
    render(Main(appData), contentArea)
}
const getFormattedKey = () => btoa(localStorage.getItem('teamworkKey') + ":")
const options = {
    method: 'GET',
    headers: {
      authorization: `Basic ${getFormattedKey()}`
    }
  };

export const getDocumentMetaData = async (apiURL) => {
  console.log('getDocumentMetaData', {apiURL})  
  return fetch(`${apiURL}?_fields=acf`).then(e => e.json())
}  
export const getTaskData = async (taskId) => {
    return fetch(`${origin}/projects/api/v3/tasks/${taskId}.json?include=comments,users`, options)
    .then(response => response.json())
}

export const getTaskCommentsJSON = async (taskId) => {
  ///projects/api/v3/tasks/{taskId}/comments.json
  return fetch(`${origin}/projects/api/v3/tasks/${taskId}/comments.json?include=users`, options)
  .then(response => response.json())
}
