import {NgModule} from "@angular/core";
import {ElectionService} from "./election.service";
import {ElectionListComponent} from "./election-list/election-list.component";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import { ElectionFormComponent } from './election-form/election-form.component';
import {FormsModule} from "@angular/forms";
import { ElectionEditModalComponent } from './election-edit-modal/election-edit-modal.component';

@NgModule({
    declarations: [ElectionListComponent, ElectionFormComponent, ElectionEditModalComponent],
    imports: [
        RouterModule,
        BrowserModule,
        FormsModule
    ],
    providers: [ElectionService],
    exports: [ElectionListComponent, ElectionFormComponent, ElectionEditModalComponent]
})

export class ElectionModule {}
