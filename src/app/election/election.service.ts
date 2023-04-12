import {Injectable} from '@angular/core';
import ElectionModel, {Editing, LocalStorageProxy, Party} from '../../models/election.model';

@Injectable({
    providedIn: 'root'
})
export class ElectionService {
    electionModel: ElectionModel;
    localStorageProxy: LocalStorageProxy<Party>;
    isEditModalOpen: boolean = false;

    constructor() {
        this.localStorageProxy = new LocalStorageProxy<Party>("parties");
        this.electionModel = new ElectionModel(this.localStorageProxy);
    }

    deleteParty(id: number) {
        this.electionModel.removeParty(id);
    }

    parties() {
        return this.electionModel.getAllParties();
    }

    addParty(name: string, votes: number) {
        this.electionModel.addParty(name, votes);
    }

    openEditModal() {
        this.isEditModalOpen = true;
    }

    closeEditModal() {
        this.isEditModalOpen = false;
    }

    editParty(editingState: Editing, party: Party, partyChanges?: Omit<Party, "id">) {
        try {
            this.electionModel.editParty(editingState, party, partyChanges);
        } catch (e: unknown) {
            alert(e)
        }
    }

    getEditingParty() {
        return this.electionModel.getEditedParty();
    }
}
