function getNoteTemplate(indexNote, note){
    return `<div class="note">
                <h3>${note.title}</h3>
                <p>${note.text}</p>
                <div class="note-actions">
                    <button onclick="moveToDone(${indexNote})" class="done-button">erledigt</button>
                    <button onclick="archiveNote(${indexNote})" class="archive-button">archivieren</button>
                </div>
            </div>`;
}

function getDoneNoteTemplate(indexDoneNote, note){
    return `<div class="done-note">
                <h3>${note.title}</h3>
                <p>${note.text}</p>
                <button onclick="deleteDoneNote(${indexDoneNote})" class="delete-button">löschen</button>
            </div>`;
}

function getArchivedNoteTemplate(indexArchivedNote, note){
    return `<div class="archived-note">
                <h3>${note.title}</h3>
                <p>${note.text}</p>
                <div class="archive-actions">
                    <button onclick="restoreArchivedNote(${indexArchivedNote})" class="restore-button">wiederherstellen</button>
                    <button onclick="deleteArchivedNote(${indexArchivedNote})" class="delete-button">löschen</button>
                </div>
            </div>`;
}