/** Here's the HTML Element format applied to the Shadow DOM:
<blog-entry>
    <article id="post${entryId}" class="blogEntry">
        <h3>${title}</h3>
        <p>${summary}</p>
        <time>Posted at ${time}.</time>
        <button class="delete" id="delete${entryId}" onclick="deleteEntry(${entryId})">Delete</button>
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
<button class="delete" id="delete${entryId}" onclick="deleteEntry(${entryId})">Delete</button>
`;
        // Attach Blog Entry onto Document
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(entryContent, bgColorStyle);
    }
}
 
function deleteEntry(id) {
    window.alert(`Attempting to delete post${id}`); // DEBUG
    let blogEntry = document.getElementById(`blogEntry${id}`);
    let shadowRoot = blogEntry.shadowRoot;
    let edit = document.createElement('h1');
    edit.textContent = "WOWOWW";
    blogEntry.shadowRoot.innerHTML = '';
};
HTMLButtonElement.prototype.deleteEntry = deleteEntry;
// This has to be appended to the document, otherwise its not findable for some reason

function editEntry(id) {
    window.alert(`Attempting to edit post${id}`); // DEBUG
    let blogEntry = document.getElementById(`blogEntry${id}`);
    let shadowRoot = blogEntry.shadowRoot;
    let edit = document.createElement('h1');
    edit.textContent = "WOWOWW";
    blogEntry.shadowRoot.innerHTML = '';
};
HTMLButtonElement.prototype.deleteEntry = deleteEntry;

export{BlogEntry, deleteEntry};

