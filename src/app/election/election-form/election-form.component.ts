import {Component, OnInit} from '@angular/core';
import {ElectionService} from "../election.service";

@Component({
  selector: 'app-election-form',
  templateUrl: './election-form.component.html'
})
export class ElectionFormComponent implements OnInit {
    partyName: string = "";
    partyVotes: number = 0;

    constructor(private electionService: ElectionService) {}

    ngOnInit(): void {}

    addPartyClick() {
        console.log(this.partyName);
        console.log(this.partyVotes);
        this.electionService.addParty(this.partyName, this.partyVotes);
        this.resetInput();
    }

    resetInput() {
        this.partyName = "";
        this.partyVotes = 0;
    }
}
