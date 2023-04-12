import {Component, OnInit} from '@angular/core';
import {ElectionService} from "../election.service";

@Component({
    selector: 'app-election-list',
    templateUrl: './election-list.component.html'
})
export class ElectionListComponent implements OnInit {

    constructor( private electionService: ElectionService ) {
    }

    editParty(id: number) {
        console.log(id);
    }

    deleteParty(id: number) {
        this.electionService.deleteParty(id);
    }

    getParties() {
        return this.electionService.parties();
    }

    ngOnInit(): void {}

}
