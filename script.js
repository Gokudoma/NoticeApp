let notes = [];
let doneNotes = [];
let archivedNotes = [];
let showArchive = false;

const NOTES_KEY = 'myNotes';
const DONE_NOTES_KEY = 'myDoneNotes';
const ARCHIVE_NOTES_KEY = 'myArchivedNotes';
const SHOW_ARCHIVE_KEY = 'showArchive';

function loadNotes() {
    const storedNotes = localStorage.getItem(NOTES_KEY);
    const storedDoneNotes = localStorage.getItem(DONE_NOTES_KEY);
    const storedArchivedNotes = localStorage.getItem(ARCHIVE_NOTES_KEY);
    const storedShowArchive = localStorage.getItem(SHOW_ARCHIVE_KEY);

    if (storedNotes) {
        notes = JSON.parse(storedNotes);
    }
    if (storedDoneNotes) {
        doneNotes = JSON.parse(storedDoneNotes);
    }
    if (storedArchivedNotes) {
        archivedNotes = JSON.parse(storedArchivedNotes);
    }
    if (storedShowArchive) {
        showArchive = JSON.parse(storedShowArchive);
    }

    renderNotes();
    renderDoneNotes();
    renderArchive();
    updateArchiveButtonText();
}

function saveNotes() {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    localStorage.setItem(DONE_NOTES_KEY, JSON.stringify(doneNotes));
    localStorage.setItem(ARCHIVE_NOTES_KEY, JSON.stringify(archivedNotes));
    localStorage.setItem(SHOW_ARCHIVE_KEY, JSON.stringify(showArchive));
}

function renderNotes(){
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        contentRef.innerHTML += getNoteTemplate(indexNote, notes[indexNote]);
    }
}

function renderDoneNotes(){
    let doneContentRef = document.getElementById('trash_content');
    doneContentRef.innerHTML = "";

    for (let indexDoneNote = 0; indexDoneNote < doneNotes.length; indexDoneNote++) {
        doneContentRef.innerHTML += getDoneNoteTemplate(indexDoneNote, doneNotes[indexDoneNote]);
    }
}

function renderArchive(){
    let archiveContentRef = document.getElementById('archive_content');
    archiveContentRef.innerHTML = "";

    if (showArchive) {
        for (let indexArchivedNote = 0; indexArchivedNote < archivedNotes.length; indexArchivedNote++) {
            archiveContentRef.innerHTML += getArchivedNoteTemplate(indexArchivedNote, archivedNotes[indexArchivedNote]);
        }
        archiveContentRef.style.display = 'block';
    } else {
        archiveContentRef.style.display = 'none';
    }
}

function updateArchiveButtonText() {
    const archiveButton = document.getElementById('archive_toggle_button');
    archiveButton.textContent = showArchive ? 'Archiv ausblenden' : 'Archiv anzeigen';
}

function toggleArchive() {
    showArchive = !showArchive;
    renderArchive();
    updateArchiveButtonText();
    saveNotes();
}

function addNote(){
    let noteInputRef = document.getElementById('note_input');
    let noteTitleInputRef = document.getElementById('note_title_input');
    let noteText = noteInputRef.value;
    let noteTitle = noteTitleInputRef.value;

    if (noteText.trim() !== "") {
        notes.push({ title: noteTitle.trim() !== "" ? noteTitle : "Kein Titel", text: noteText });
        renderNotes();
        saveNotes();
    }

    noteInputRef.value = "";
    noteTitleInputRef.value = "";
}

function moveToDone(indexNote){
    const movedNote = notes.splice(indexNote, 1)[0];
    doneNotes.push(movedNote);
    renderNotes();
    renderDoneNotes();
    saveNotes();
}

function deleteDoneNote(indexDoneNote){
    doneNotes.splice(indexDoneNote, 1);
    renderDoneNotes();
    saveNotes();
}

function archiveNote(indexNote){
    const archivedNote = notes.splice(indexNote, 1)[0];
    archivedNotes.push(archivedNote);
    renderNotes();
    renderArchive();
    saveNotes();
}

function restoreArchivedNote(indexArchivedNote){
    const restoredNote = archivedNotes.splice(indexArchivedNote, 1)[0];
    notes.push(restoredNote);
    renderNotes();
    renderArchive();
    saveNotes();
}

function deleteArchivedNote(indexArchivedNote){
    archivedNotes.splice(indexArchivedNote, 1);
    renderArchive();
    saveNotes();
}