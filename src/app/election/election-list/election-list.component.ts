import {Component, OnInit} from '@angular/core';
import {ElectionService} from "../election.service";
import {Party} from "../../../models/election.model";

@Component({
    selector: 'app-election-list',
    templateUrl: './election-list.component.html'
})
export class ElectionListComponent implements OnInit {
    parties: Array<Party> = [];

    constructor( private electionService: ElectionService ) {
        this.parties = this.electionService.parties();
    }

    ngOnInit(): void {}

}
