const noteForm = document.getElementById('noteForm');
const noteInput = document.getElementById('noteInput');
const noteList = document.getElementById('noteList');

noteForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newNote = document.createElement('li');
    newNote.textContent = noteInput.value;
    noteList.appendChild(newNote);
    noteInput.value = '';
});
noteList.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('completed');
    }
});
noteList.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    if (event.target.tagName === 'LI') {
        event.target.remove();
    }
});
// Save notes to localStorage
window.addEventListener('beforeunload', function() {
    const notes = [];
    noteList.querySelectorAll('li').forEach(function(note){
        notes.push(note.textContent);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
});
// Load notes from localStorage
window.addEventListener('load', function() {
    const savenotes = JSON.parse(localStorage.getItem('notes')) || [];
    savenotes.forEach(function(note) {
        const newNote = document.createElement('li');
        newNote.textContent = note;
        noteList.appendChild(newNote);
    });
    });
noteInput.addEventListener('input', function() {
    if (noteInput.value.trim() === '') {
        noteInput.classList.add('error');
    } else {
        noteInput.classList.remove('error');
    }
});
