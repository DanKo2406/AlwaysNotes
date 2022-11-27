let notes = null
const serverUrl = new URL('http://' + location.host + ':3000')
const notesUrl = new URL('/notes', serverUrl)
const deletedNotesUrl = new URL('/deletedNotes', serverUrl)

async function readNotes() {
    let response = await fetch(notesUrl)
    if (response.ok) { 
        notes = await response.json()       
        renderingNotes()
    } else {
        alert("Ошибка HTTP: " + response.status)
    }
}
async function recordNotes() {
    await fetch(notesUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(notes)
    })
}

async function deleteTrash() {
    await fetch(deletedNotesUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: '{}'
    })
}

function renderingNotes() {
    let allBlock = document.getElementsByClassName('noteBlock')
    for (let item = allBlock.length; item > 0; item--) {
        allBlock[item - 1].remove()
    }

    let arrNotes = Object.values(notes)
    arrNotes.sort((a, b) => b.date - a.date)
    for (let item of arrNotes) {
        let noteBlock = document.createElement('div')
        noteBlock.className = "noteBlock"
        document.body.append(noteBlock)

        let noteHeader = document.createElement('input')
        noteHeader.type = 'textbox'
        noteHeader.value = item.header
        noteBlock.append(noteHeader)
        noteHeader.oninput = () => {
            item.header = noteHeader.value
        }

        let noteText = document.createElement('textarea')
        noteText.value = item.text
        noteBlock.append(noteText)
        noteText.style.height = noteText.scrollHeight + 'px'
        noteText.oninput = () => {
            item.text = noteText.value
            noteText.style.height = 'auto'
            noteText.style.height = noteText.scrollHeight + 'px'
        }

        let button = document.createElement('button')
        button.innerHTML = "[x]"
        button.classList.add('cross')
        button.onclick = () => {
            delete notes[item.date]
            renderingNotes()
        }
        noteBlock.append(button)
    }
}

create.onclick = () => {
    const index = Date.now()
    notes[index] = {}
    notes[index].date = index
    notes[index].header = "Введите заголовок"
    notes[index].text = "Введите текст"
    
    renderingNotes()
}
save.onclick = () => {
    recordNotes()
}

readNotes()