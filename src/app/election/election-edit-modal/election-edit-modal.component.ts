import {Component} from '@angular/core';
import {ElectionService} from "../election.service";
import {Editing, Party} from "../../../models/election.model";

@Component({
    selector: 'app-election-edit-modal',
    templateUrl: './election-edit-modal.component.html'
})
export class ElectionEditModalComponent {
    partyName: string = "";
    partyVotes: number = 0;

    constructor(private electionService: ElectionService) {
    }

    getModalOpen() {
        return this.electionService.isEditModalOpen;
    }

    closeModal() {
        this.electionService.closeEditModal();
        const editingParty = this.electionService.getEditingParty();
        if (!editingParty) return;
        try {
            this.electionService.editParty(Editing.Cancel, editingParty);
        } catch (e: unknown) {
            alert(e)
        } finally {
            this.resetModalInputs();
        }
    }

    confirmEdit() {
        this.electionService.closeEditModal();
        const editingParty = this.electionService.getEditingParty();
        if (!editingParty) return;
        const partyChanges: Omit<Party, "id"> = {name: this.partyName, votes: this.partyVotes};
        try {
            this.electionService.editParty(Editing.Done, editingParty, partyChanges);
        } catch (e: unknown) {
            alert(e)
        } finally {
            this.resetModalInputs();
        }
    }

    resetModalInputs() {
        this.partyVotes = 0;
        this.partyName = "";
    }
}
