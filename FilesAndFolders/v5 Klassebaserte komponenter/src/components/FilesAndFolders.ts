import { BaseComponent } from "../components/BaseComponent";
import type { FileOrFolder } from "../types";

export class FilesAndFolders extends BaseComponent {
    static props = ['items', 'parent-folder'];
    render() {
        const filesAndFolders = this.get('items') as FileOrFolder[] || [];
        const parentFolder = this.get('parent-folder') as number || false;

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
        `;
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


