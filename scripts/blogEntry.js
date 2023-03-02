export class BlogEntry extends HTMLElement {
    constructor(title, summary, time, id, bgColor) {
        super();

        let entryTime = time;
        let entryId = id;
        let bgColorStyle = document.createElement('style');
        bgColorStyle.innerHTML = `
#post${entryId} {
    background-color: ${bgColor};
}
`;
        let entryContent = document.createElement('article');
        entryContent.id = `post${entryId}`;
        entryContent.class = "blogEntry";
        entryContent.innerHTML = `
<h3>${title}</h3>
<p>${summary}</p>
<time>Posted at ${time}.</time>
`;
        // Attach Blog Entry onto Document
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(entryContent, bgColorStyle);
    }
    /*
    function deleteEntry() {
        //NOTDONE;
    }*/
}

/** Here's an example of the HTML format applied to the Shadow DOM:
<blog-entry>
    <article id="${entryId}" class="blogEntry">
        <h3>${title}</h3>
        <p>${summary}</p>
        <time>Posted at ${time}.</time>
    </article>
    <style>
        #post${entryId} {
            background-color: ${bgColor};
        }
    </style>
</blog-entry>
*/