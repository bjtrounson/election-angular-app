import {Injectable} from '@angular/core';
import ElectionModel, {LocalStorageProxy, Party} from '../../models/election.model';

@Injectable({
    providedIn: 'root'
})
export class ElectionService {
    electionModel: ElectionModel;
    localStorageProxy: LocalStorageProxy<Party>;

    constructor() {
        this.localStorageProxy = new LocalStorageProxy<Party>("parties", [
            {id: 0, name: "Party 1", votes: 10},
            {id: 1, name: "Party 2", votes: 200},
            {id: 2, name: "Party 3", votes: 3000},
        ]);
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
}
