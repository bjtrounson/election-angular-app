import {Component, OnInit} from '@angular/core';
import {ElectionService} from "../election.service";
import {Editing} from "../../../models/election.model";

@Component({
    selector: 'app-election-list',
    templateUrl: './election-list.component.html'
})
export class ElectionListComponent implements OnInit {

    constructor( private electionService: ElectionService ) {}

    startEditingParty(id: number) {
        const party = this.getParties().find(party => party.id === id);
        this.electionService.openEditModal();
        if (!party) return;
        this.electionService.editParty(Editing.Start, party);
    }

    deleteParty(id: number) {
        this.electionService.deleteParty(id);
    }

    getParties() {
        return this.electionService.parties();
    }

    ngOnInit(): void {}

}
