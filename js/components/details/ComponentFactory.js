import { html } from "../../../node_modules/lit-html/lit-html.js";
import { TitleParagraph } from './TitleParagraph.js';
import { FeaturedImage } from './FeaturedImage.js';
import { AltTextImages } from './AltTextImages.js';

export const detailsComponentFactory = (detail) => {

    if(detail.status === 'FAIL'){
        return html`
        <h2>${detail.title}</h2>
        <p>${detail.message}</p>
        `
    }
    
    switch (detail.displayType) {
        case 'meta-description': return TitleParagraph(detail); break;
        case 'content-group': return TitleParagraph(detail); break;
        case  'featured-image': return FeaturedImage(detail); break;
        case 'alt-text': return AltTextImages(detail); break;
        default: return html`
                <p>Component Not Implemented</p>
                <div style="max-width: 100%;">
                  ${JSON.stringify(detail)}
                </div>`;
    }

}
