const TAMUC_ORIGIN = 'https://www.tamuc.edu';
import { Store } from "./js/store.js";
import {updateDOM, getTaskData, getDocumentMetaData, getTaskCommentsJSON} from "./js/router.js"

const store = new Store()
const defaultData = {
    store,
    currentPage: 'discussion.html',
    teamworkData: null
}
store.setValue(defaultData)
updateDOM(defaultData)
store.onUpdate(updateDOM)


const sendMessage = async (tab) => {
    if (!tab?.url) return;
    const url = new URL(tab.url);
    // Enables the side panel on google.com
    if (url.origin === TAMUC_ORIGIN) {  
        let apiURL;
        let twId
        try {
            const {apiURL: tryApiUrl} = await chrome.tabs.sendMessage(tab.id, { greeting: "hello" });
            apiURL = tryApiUrl;
        } catch (error) {
            console.log('error trying to get apiURL from tab', {error})
            return;
        }
        try {
            const {acf: {teamwork_task_url: twId_temp}} = await getDocumentMetaData(apiURL)
            twId = twId_temp
        } catch (error) {
            console.log('error trying to get twId', {error})
            return;
        }
        try {
            const teamworkData = await getTaskCommentsJSON(twId)
            console.log('sendMessage', {teamworkData})
            store.transformValue((data) => {
                data.teamworkData = teamworkData
                return data
            })
        } catch (error) {
            console.log('error trying to get teamworkData', {error})
            return;
        }
    }
}

const sendMessageHandler = async () => {
    try {
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        sendMessage(tab)
    } catch (error) {
        console.log('error trying to get active tab', {error})
    }
}
sendMessageHandler()

chrome.tabs.onUpdated.addListener(async () => {
    sendMessageHandler()
});

chrome.tabs.onActivated.addListener(async () => {
    sendMessageHandler()
})

