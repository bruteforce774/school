import { BaseComponent } from "../components/BaseComponent";
import type { FileOrFolder } from "../types";

export class FilesAndFolders extends BaseComponent {
    static props = ['items', 'parent-folder', 'current-file'];

    private state = {
        showContent: false
    }

    render() {
        const filesAndFolders = this.get('items') as FileOrFolder[] || [];
        const parentFolder = this.get('parent-folder') as number || false;
        const currentFile = this.get('current-file') as FileOrFolder | null;

        this.shadowRoot!.innerHTML = /*HTML*/`
            <fieldset>
                <legend>Mapper og filer</legend>
                ${parentFolder ?/*HTML*/`
                    📁 <a href="" data-id="${parentFolder}">..</a><br/>` : ''}
                ${filesAndFolders.filter(f => !f.hasOwnProperty('content')).map(f =>/*HTML*/`
                    📁 <a href="" data-id="${f.id}">${f.name}</a><br/>
                `).join('')}
                ${filesAndFolders.filter(f => f.hasOwnProperty('content')).map(f =>/*HTML*/`
                    <span>🗎</span> <a href="" data-id="${f.id}">${f.name}</a><br/>
                `).join('')}
            </fieldset>

            ${currentFile && currentFile.hasOwnProperty('content') ? /*HTML*/`
                <fieldset>
                    <legend>${currentFile.name}</legend>
                    <button id="toggle-content">
                        ${this.state.showContent ? 'Skjul innhold' : 'Vis innhold'}
                    </button>
                    ${this.state.showContent ? /*HTML*/`
                        <pre>${currentFile.content}</pre>
                    ` : ''}
                </fieldset>
            ` : ''}
        `;

        const toggleBtn = this.shadowRoot!.querySelector('#toggle-content');
        
        if(toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.state.showContent = !this.state.showContent;
                this.render();
            });
        }

        this.shadowRoot!.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(e: Event) {
        e.preventDefault();
        const target = e.target! as HTMLElement;
        if (target.matches('a')) {
            const aElement = e.target as HTMLAnchorElement;
            const id = aElement.getAttribute('data-id');
            const event = new CustomEvent('selected', { detail: id });
            this.dispatchEvent(event);
        }
    }
}


