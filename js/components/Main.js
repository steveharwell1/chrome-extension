import { DiscussionPage } from './DiscussionPage.js';
import { SettingsPage } from './SettingsPage.js';
import { NotFoundPage } from './NotFoundPage.js';

export const Main = (appData) => {
    if(appData.currentPage === 'discussion.html') {
        return DiscussionPage(appData)
    } else if(appData.currentPage === 'settings.html') {
        return SettingsPage(appData)
    } else {
        return NotFoundPage(appData)
    }
}
