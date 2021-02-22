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

  nodeClicked(e, obj) {  // executed by click and doubleclick handlers
    console.log(obj.part.data);
  }

  // initialize diagram / templates
  public initDiagram(): go.Diagram {

    function nodeClicked(e, obj) {  // executed by click and doubleclick handlers
      console.log(obj.part.data);
    }

    const $ = go.GraphObject.make;
    const diagram = $(go.Diagram, {
      'undoManager.isEnabled': true, // must be set to allow for model change listening
      // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
      model: $(go.GraphLinksModel,
        {
          linkKeyProperty: 'key' // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        }
      ),
      initialAutoScale: go.Diagram.UniformToFill,
      layout: $(go.LayeredDigraphLayout)
    });
  
    // define the Node template
    diagram.nodeTemplate =
      $(go.Node, "Auto",  // the whole node panel
      // define the node's outer shape, which will surround the TextBlock
        // {
        //   click: function(e, obj) { this.nodeClicked(obj.part.data); }
        // },
        $(go.Shape, "Circle",
          { fill: "CornflowerBlue", stroke: "black", spot1: new go.Spot(0, 0, 5, 5), spot2: new go.Spot(1, 1, -5, -5) }),
        $(go.TextBlock,
          { font: "bold 10pt helvetica, bold arial, sans-serif", textAlign: "center", maxSize: new go.Size(100, NaN) },
          new go.Binding("text", "name"))
      );

    // replace the default Link template in the linkTemplateMap
    diagram.linkTemplate =
      $(go.Link,  // the whole link panel
        $(go.Shape,  // the link shape
          { stroke: "black" }),
        $(go.Shape,  // the arrowhead
          { toArrow: "standard", stroke: null }),
        $(go.Panel, "Auto",
          $(go.TextBlock,  // the label text
            {
              textAlign: "center",
              font: "10pt helvetica, arial, sans-serif",
              stroke: "#555555",
              margin: 4
            },
            new go.Binding("text", "name"))
        )
      );
  
    return diagram;
  }

  public diagramDivClassName: string = 'myDiagram';
  public diagramModelData = { prop: 'value' };
  public skipsDiagramUpdate = false;
  
  // When the diagram model changes, update app data to reflect those changes
  public diagramModelChange = function(changes: go.IncrementalData) {
    // when setting state here, be sure to set skipsDiagramUpdate: true since GoJS already has this update
    // (since this is a GoJS model changed listener event function)
    // this way, we don't log an unneeded transaction in the Diagram's undoManager history
    this.skipsDiagramUpdate = true;
  
    this.diagramNodeData = DataSyncService.syncNodeData(changes, this.diagramNodeData);
    this.diagramLinkData = DataSyncService.syncLinkData(changes, this.diagramLinkData);
    this.diagramModelData = DataSyncService.syncModelData(changes, this.diagramModelData);
  };
}
