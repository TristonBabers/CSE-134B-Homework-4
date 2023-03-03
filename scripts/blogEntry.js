/** Here's the HTML Element format applied to the Shadow DOM:
<blog-entry>
    <article id="post${entryId}" class="blogEntry">
        <h3>${title}</h3>
        <p>${summary}</p>
        <time>Posted at ${time}.</time>
        <button class="delete" id="delete${entryId}" onclick="showDelete(${entryId})">Delete</button>
        <button class="edit" id="delete${entryId}" onclick="showEdit(${entryId})">Edit</button>
    </article>
    <style>
        #post${entryId} {
            background-color: ${bgColor};
        }
    </style>
</blog-entry>
*/
class BlogEntry extends HTMLElement {
    constructor(title, summary, time, id, bgColor) {
        super();
        let entryTitle = title;
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
<button class="delete" id="delete${entryId}" onclick="showDelete(${entryId})">Delete</button>
<button class="edit" id="delete${entryId}" onclick="showEdit(${entryId})">Edit</button>
`;
        // Attach Blog Entry onto Document
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(entryContent, bgColorStyle);
    }
}

/* I honestly wanted the following functions to be a part of the class declared above, but I
 * had a lot of trouble implementing that, so I used these global functions as a work around.
 */ 
function deleteEntry(id) {
    let blogEntry = document.getElementById(`blogEntry${id}`);
    blogEntry.shadowRoot.innerHTML = '';
};

function getEntryTitle(id) {
    let blogEntry = document.getElementById(`blogEntry${id}`);
    return blogEntry.shadowRoot.firstChild.firstChild.nextSibling.innerHTML;
}

function getEntrySummary(id) {
    let blogEntry = document.getElementById(`blogEntry${id}`);
    return blogEntry.shadowRoot.firstChild.firstChild.nextSibling.nextSibling.nextSibling.innerHTML;
}

function getBgColor(id) {
    let blogEntry = document.getElementById(`blogEntry${id}`);
    return blogEntry.shadowRoot.firstChild.nextSibling.innerHTML.slice(-11, -4);
}

function editEntry(title, summary, id, bgColor) {
    // Edit Title
    let blogEntry = document.getElementById(`blogEntry${id}`);
    blogEntry.shadowRoot.firstChild.firstChild.nextSibling.innerHTML = title;

    // Edit Summary
    blogEntry.shadowRoot.firstChild.firstChild.nextSibling.nextSibling.nextSibling.innerHTML = summary;

    // Edit BgColor
    let bgStyle = blogEntry.shadowRoot.firstChild.nextSibling.innerHTML;
    let updatedBgStyle = bgStyle.slice(0, -11) + bgColor + bgStyle.slice(-4, bgStyle.length);
    blogEntry.shadowRoot.firstChild.nextSibling.innerHTML = updatedBgStyle;
};

export{BlogEntry, deleteEntry, getEntryTitle, getEntrySummary, getBgColor, editEntry};