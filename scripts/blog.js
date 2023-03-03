import { BlogEntry, deleteEntry, getEntryTitle, getEntrySummary, getBgColor, editEntry } from "./blogEntry.js";
window.addEventListener('DOMContentLoaded', init);
customElements.define('blog-entry', BlogEntry);

function init() {
    // Initialize Blog Post Components
    const blogEntries = document.getElementById('blogEntries');
    const addNewButton = document.getElementById('addNew');
    const addNewDialog = document.getElementById('addNewDialog');
    const deleteDialog = document.getElementById('deleteDialog');
    const editDialog = document.getElementById('editDialog');

    // AddNew Event Listener
    /* The addNew button is seperate from entries and exists to append new
     * BlogEntry custom objects onto the page.
     */
    addNewButton.addEventListener('click', showAddNew);
    function showAddNew() {
        addNewDialog.showModal();
    }
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
        let entryId = idNum;
        idNum += 1;
        
        // Calculate Date
        /* reference: https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd */
        let date = new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', hour12: true, minute:'2-digit', second:'2-digit'})

        // Create and Append Entry to the blogEntries
        let blogEntry = new BlogEntry(cleanTitle, cleanSummary, date, entryId, bgColor.value);
        blogEntry.id = `blogEntry${entryId}`;
        blogEntries.appendChild(blogEntry);

        // Reset fields on close
        postTitle.value = ``;
        summary.value = ``;
        bgColor.value = `#FFFFFF`;
    });

    // Delete & Edit Functions
    /* The delete and edit functions are called from the onclick attributes on entry elements
     * themselves, so they need to store the Id of the entry that is calling the dialog.
     */
    let currentId = null;
    // Delete Button Function
    function showDelete(id) {
        currentId = id;
        deleteDialog.showModal();
    }
    // This has to be appended to the button element, otherwise it's not defined for some reason
    HTMLButtonElement.prototype.showDelete = showDelete;
    deleteDialog.addEventListener('close', (event) => {
        if (deleteDialog.returnValue === `delete`) {
            deleteEntry(currentId);
        }
        uncertain.innerHTML = `I'm not sure`;
    });
    // Extra [I'm not sure] button on Delete
    const uncertain = document.getElementById('uncertain');
    uncertain.addEventListener('click', () => {
        uncertain.innerHTML = `It's okay to be unsure <3`;
    });

    // Edit Button Function
    const editPostTitle = document.getElementById('editPostTitle');
    const editSummary = document.getElementById('editSummary');
    const editBgColor = document.getElementById('editBgColor');
    function showEdit(id) {
        currentId = id;
        editPostTitle.value = getEntryTitle(id);
        editSummary.value = getEntrySummary(id);
        editBgColor.value = getBgColor(id);
        
        editDialog.showModal();
    }
    // This has to be appended to the button element, otherwise it's not defined for some reason
    HTMLButtonElement.prototype.showEdit = showEdit;
    editDialog.addEventListener('close', (event) => {
        if (editDialog.returnValue === `cancel`) {
            return;
        }

        // Sanitize User Input (All users are evil!)
        let cleanTitle = DOMPurify.sanitize(editPostTitle.value);
        let cleanSummary = DOMPurify.sanitize(editSummary.value);

        // Keep Same Id
        let entryId = currentId;

        // Edit Entry
        editEntry(cleanTitle, cleanSummary, entryId, editBgColor.value);
    });
}