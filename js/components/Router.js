import { DiscussionPage } from './DiscussionPage.js';
import { SettingsPage } from './SettingsPage.js';
import { DetailsPage } from './DetailsPage.js';
import { NotFoundPage } from './NotFoundPage.js';

export const Router = (appData) => {
    if(appData.currentPage === 'discussion.html') {
        return DiscussionPage(appData)
    } else if(appData.currentPage === 'settings.html') {
        return SettingsPage(appData)
    } else if(appData.currentPage === 'details.html') {
        return DetailsPage(appData)  
    } else {
        return NotFoundPage(appData)
    }
}
