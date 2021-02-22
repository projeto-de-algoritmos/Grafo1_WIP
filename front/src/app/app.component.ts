import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as go from 'gojs';
import { DataSyncService, DiagramComponent } from 'gojs-angular';
import * as _ from 'lodash';
import { ModalComponent } from './modal/modal.component';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('myDiagram', { static: true }) public myDiagramComponent: DiagramComponent;

  public diagramNodeData: Array<go.ObjectData> = [];
  public diagramLinkData: Array<go.ObjectData> = [];
  public firstInsta: string = 'https://www.instagram.com/quebrandootabu';

  constructor(public appService : AppService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.search();
  }

  ngAfterViewInit() {
    this.myDiagramComponent.diagram.addDiagramListener("ObjectSingleClicked", (ev) => {
      this.openDialog(ev.subject.part.data);
    });
  }

  public openDialog(people) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '0',
      left: '0'
    };
    dialogConfig.data = people;

    this.dialog.open(ModalComponent, dialogConfig);
  }

  search() {
    this.appService.getData(this.firstInsta).subscribe((result) =>  {
      this.diagramNodeData = result['obj2'];
      this.diagramLinkData = result['obj'];

      const model = new go.GraphLinksModel();

      model.linkKeyProperty = 'key';
      model.nodeDataArray = this.diagramNodeData;
      model.linkDataArray = this.diagramLinkData;
  
      this.myDiagramComponent.diagram.model = model;
    });
  }
}
