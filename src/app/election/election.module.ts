import {NgModule} from "@angular/core";
import {ElectionService} from "./election.service";
import {ElectionListComponent} from "./election-list/election-list.component";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import { ElectionFormComponent } from './election-form/election-form.component';

@NgModule({
    declarations: [ElectionListComponent, ElectionFormComponent],
    imports: [
        RouterModule,
        BrowserModule
    ],
    providers: [ElectionService],
    exports: [ElectionListComponent, ElectionFormComponent]
})

export class ElectionModule {}
