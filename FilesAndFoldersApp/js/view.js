function updateView() {
    document.getElementById('app').innerHTML = /*HTML*/`
        <h1>Filer og mapper</h1>
        Du er her: ${createSummarySelected()}<br/>
        ${createFoldersHtml()}
        ${createFilesHtml()}
        ${createEditFileHtml()}
    `;
}

function createSummarySelected() {
    let id = model.app.currentId;
    if (id == null) return '<i>rotmappe</i>';
    let breadcrumbs = '';
    while (id) {
        let fileOrFolder = model.filesAndFolders.find(f => f.id == id);
        if (breadcrumbs != '') breadcrumbs = ' > ' + breadcrumbs;
        breadcrumbs = fileOrFolder.name + breadcrumbs;
        id = fileOrFolder.parentId;
    }
    return breadcrumbs;
}

function createFoldersHtml() {
    let currentId = model.app.currentId;
    const currentFileOrFolder = model.filesAndFolders.find(f => f.id == currentId);
    let html = '';
    if (currentFileOrFolder != null) {
        html = `📁 <a href="javascript:select(${currentFileOrFolder.parentId})">..</a><br/>`;
        if (currentFileOrFolder.hasOwnProperty('content')) currentId = currentFileOrFolder.parentId;
    }
    for (let folder of model.filesAndFolders) {
        if (folder.hasOwnProperty('content') || folder.parentId != currentId) continue;
        html += `📁 <a href="javascript:select(${folder.id})">${folder.name}</a><br/>`;
    }
    return html;
}

function createFilesHtml() {
    let currentId = model.app.currentId;
    const currentFileOrFolder = model.filesAndFolders.find(f => f.id == currentId);
    if (currentFileOrFolder != null) {
        if (currentFileOrFolder.hasOwnProperty('content')) currentId = currentFileOrFolder.parentId;
    }
    let html = '';
    for (let file of model.filesAndFolders) {
        if (!file.hasOwnProperty('content') || file.parentId != currentId) continue;
        html += `<span>🗎</span> <a href="javascript:select(${file.id})">${file.name}</a><br/>`;
    }
    return html;
}

function createEditFileHtml() {
    const currentId = model.app.currentId;
    if (currentId == null) return '';
    const currentFile = model.filesAndFolders.find(f => f.id == currentId);
    if (!currentFile.hasOwnProperty('content')) return '';
    return /*HTML*/`
        <textarea>${currentFile.content}</textarea>    
        <br/>
        <button>Lagre</button>
        <button>Avbryt</button>
    `;
}