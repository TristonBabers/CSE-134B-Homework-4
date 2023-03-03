import { BlogEntry, deleteEntry } from "./blogEntry.js";
window.addEventListener('DOMContentLoaded', init);
customElements.define('blog-entry', BlogEntry);

function init() {
    // **Important** Create ShadowRoot to attach Blog entries to
    const shadowRoot = document.getElementById('blogEntries');

    // Select "Display Dialog Button" Elements
    const addNewButton = document.getElementById('addNew');
    const deleteButton = document.getElementById('delete');

    // Output & promptName
    const blogEntries = document.getElementById('blogEntries');

    // Dialog Elements
    const addNewDialog = document.getElementById('addNewDialog');
    const deleteDialog = document.getElementById('deleteDialog');

    // Show Modals
    addNewButton.addEventListener('click', showAddNew);
    function showAddNew() {
        addNewDialog.showModal();
    }
    deleteButton.addEventListener('click', showDelete);
    function showDelete() {
        deleteDialog.showModal();
    }

    // AddNew Event Listener
    /* The addNew button is seperate from entries and exists to initialize new
     * BlogEntry custom objects onto the shadowRoot.
     */
    const postTitle = document.getElementById('postTitle');
    const summary = document.getElementById('summary');
    const bgColor = document.getElementById('bgColor');
    let idNum = 0;
    addNewDialog.addEventListener('close', (event) => {
        // If Cancel is hit don't add anything
        if (addNewDialog.returnValue === 'cancel') {
            // Reset fields on close
            postTitle.value = ``;
            summary.value = ``;
            bgColor.value = `#FFFFFF`;
            return;
        }

        // Sanitize User Input (All users are evil!)
        let cleanTitle = DOMPurify.sanitize(postTitle.value);
        let cleanSummary = DOMPurify.sanitize(summary.value);

        // Create Unique ID
        let entryID = idNum; // TODO: Make this a UUID (Otherwise could collide and Y2k38)
        idNum += 1;
        
        // Calculate Date
        /* reference: https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd */
        let date = new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', hour12: true, minute:'2-digit', second:'2-digit'})
        let formattedDate = date;

        // Create and Append Entry to shadowRoot
        let blogEntry = new BlogEntry(cleanTitle, cleanSummary, formattedDate, entryID, bgColor.value);
        blogEntry.id = `blogEntry${entryID}`;
        shadowRoot.appendChild(blogEntry);

        // Reset fields on close
        postTitle.value = ``;
        summary.value = ``;
        bgColor.value = `#FFFFFF`;
    });

    // Extra [I'm not sure] button on Delete
    const uncertain = document.getElementById('uncertain');
    uncertain.addEventListener('click', () => {
        uncertain.innerHTML = `It's okay to be unsure <3`;
    });
}