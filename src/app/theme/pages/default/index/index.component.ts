import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { GridControlComponent } from '../app-tools/gridcontrol/grid-control.component';

@Component({
    selector: "app-index",
    templateUrl: "./index.component.html",
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({ opacity: 0 }),
                    animate('250ms', style({ opacity: 1 }))
                ]),
                transition(':leave', [
                    style({ opacity: 1 }),
                    animate('250ms', style({ opacity: 0 }))
                ])
            ]
        )
    ],
})
export class IndexComponent implements OnInit, AfterViewInit {
    showSelected: boolean;
    showdataproperty: boolean;
    removeItemClass: boolean;
    showelEmentStyle: boolean = false;
    isRenderEle: boolean = false;
    itemsGridDropped: Array<any> = [];
    createNewGrid: Array<any> = [];
    itemsDropped: Array<any> = [];
    autoRenderGrid: Array<any> = [];
    constructor(private _script: ScriptLoaderService) {

    }
    ngOnInit() {
        this.showSelected = (this.itemsDropped.length) > 0 ? false : true;
        this.removeItemClass = true;
        this.showdataproperty = false;
    }
    ngAfterViewInit() {

        this._script.loadScripts('app-index',
            ['assets/app/js/dashboard.js']);
    }
    //push drag element in to array
    public addDropItem(event) {
        if (!this.isRenderEle) {
            if (event.itemRenderId == undefined) {
                event.showBasicControl = (event.content != 'dividercontrol' && event.content != 'gridcontrol' && event.content != 'sectioncontrol' && event.content != 'spacercontrol' && event.content != 'fileattachmentcontrol' && event.content != 'embedvidcontrol') ? true : false;
                event.arrayType = "Main Grid";
                event.itemRenderId = (this.autoRenderGrid.length + 1);
                this.autoRenderGrid.push(event.itemRenderId);
                event.divClass = (event.content == 'sectioncontrol' || event.content == 'gridcontrol') ? "element-box-contents-for-stracture" : (event.content == 'dividercontrol') ? "element-box-contents-for-divider" : (event.content == 'spacercontrol') ? "element-box-contents-for-spacer" : "element-box-contents";

                event.showElementDelete = event.showelEmentStyle = false;
                event.showCustomDiv = event.showAllDragEle = true;
                this.itemsDropped.push(event);
                if (this.itemsDropped.length > 0)
                    this.showSelected = false;
            }
        }
        this.isRenderEle = false;
    }
    //hide custome edit div
    public hideCustomEditDiv(item) {
        this.itemsDropped.forEach(function(item) {
            item.divClass = "";
            item.showCustomDiv = item.showElementDelete = item.showelEmentStyle = false;
        });
        if (this.itemsGridDropped.length > 0) {
            this.itemsGridDropped.forEach(function(item, $index) {
                item.forEach(function(item, $index) {
                    item.forEach(function(item, $index) {
                        item.divClass = "";
                        item.showCustomDiv = item.showElementDelete = item.showelEmentStyle = false;
                    });
                });
            });
        }
    }
    //start drag element
    public startDrag(item) {
        console.log('Begining to drag item: ' + item);
    }
    //release drop position
    public releaseDrop(event: MouseEvent) {
        console.log('Release to drag item:');
    }
    //Delete Grid Item
    public deleteGridItem(myitemRenderId) {
        let check = false;
        let getRenderId = myitemRenderId;
        let deleteArrayItem: Array<any> = [];
        this.itemsGridDropped.forEach(function(item, $mainindex) {
            item.forEach(function(item, $index) {
                item.forEach(function(item, $i) {
                    if (item.itemRenderId == getRenderId) {
                        item.mainGridindex = $mainindex;
                        item.gridArryLength = $index;
                        item.gridindex = $i;
                        deleteArrayItem.push(item);
                        item.showElementDelete = (!item.showElementDelete) ? true : false;
                        return false;
                    }
                });
            });
        });
        if (deleteArrayItem.length > 0) {
            this.itemsGridDropped[deleteArrayItem[0].mainGridindex][deleteArrayItem[0].gridArryLength].splice(this.itemsGridDropped[deleteArrayItem[0].mainGridindex][deleteArrayItem[0].gridArryLength].indexOf(deleteArrayItem[0]), 1);

            if (this.itemsGridDropped[deleteArrayItem[0].mainGridindex][deleteArrayItem[0].gridArryLength].length === 1)
                this.createNewGrid[deleteArrayItem[0].mainGridindex][deleteArrayItem[0].gridArryLength].showDemoGridText = true;

            deleteArrayItem = [];
            check = true;
        }
        return check;
    }
    public deleteMainItem(myitemRenderId) {
        let check = false;
        let getRenderId = myitemRenderId;
        let a = this.itemsDropped.find(item => item.itemRenderId === getRenderId);
        if (a != undefined) {
            a.showElementDelete = (!a.showElementDelete) ? true : false;
            this.itemsDropped.splice(this.itemsDropped.indexOf(a), 1);
            check = true;
        }
        return check;
    }
    //Global function for remove element
    public globalRemoveItem(myitemRenderId, myArrayType) {
        try {
            if (myArrayType == "Grid") {
                let getResponse = this.deleteGridItem(myitemRenderId);
                if (!getResponse)
                    this.deleteMainItem(myitemRenderId);
            }
            else {
                let getResponse = this.deleteMainItem(myitemRenderId);
                if (!getResponse)
                    this.deleteGridItem(myitemRenderId)
            }
            if (this.itemsDropped.length === 0)
                this.showSelected = true;
        }
        catch (e) {
        }
    }
    //Global function for showParticular Element on load
    public globalShowParticularElement(getRenderId, getArrayType) {
        try {
            let check = false;
            this.itemsDropped.forEach(function(item) {
                item.divClass = "";
                item.showCustomDiv = false;
            });
            let initRenderId = getRenderId;
            this.itemsGridDropped.forEach(function(item, $index) {
                item.forEach(function(item, $index) {
                    item.forEach(function(item, $index) {
                        item.divClass = "";
                        item.showCustomDiv = false;
                        if (item.itemRenderId == initRenderId) {
                            item.divClass = (item.content == 'sectioncontrol' || item.content == 'gridcontrol') ? "element-box-contents-for-stracture" : (item.content == 'dividercontrol') ? "element-box-contents-for-divider" : (item.content == 'spacercontrol') ? "element-box-contents-for-spacer" : "element-box-contents";
                            item.showCustomDiv = true;
                            check = true;
                        }
                    });
                });
            });
            if (!check) {
                let a = this.itemsDropped.find(item => item.itemRenderId === getRenderId);
                if (a != undefined) {
                    a.divClass = (a.content == 'sectioncontrol' || a.content == 'gridcontrol') ? "element-box-contents-for-stracture" : (a.content == 'dividercontrol') ? "element-box-contents-for-divider" : (a.content == 'spacercontrol') ? "element-box-contents-for-spacer" : "element-box-contents";
                    a.showCustomDiv = true;
                }
            }
        }
        catch (e) {
        }
    }
    public showGridItem(getRenderId) {
        let check = false;
        this.itemsGridDropped.forEach(function(item, $index) {
            item.forEach(function(item, $index) {
                item.forEach(function(item, $index) {
                    item.divClass = "";
                    item.showCustomDiv = false;
                    if (item.itemRenderId == getRenderId) {
                        item.divClass = (item.content == 'sectioncontrol' || item.content == 'gridcontrol') ? "element-box-contents-for-stracture" : (item.content == 'dividercontrol') ? "element-box-contents-for-divider" : (item.content == 'spacercontrol') ? "element-box-contents-for-spacer" : "element-box-contents";
                        item.showCustomDiv = true;
                        check = true;
                    }
                });
            });
        });
        return check;
    }
    public showMainItem(getRenderId) {
        let check = false;
        this.itemsDropped.forEach(function(item) {
            item.divClass = "";
            item.showCustomDiv = false;
        });
        let a = this.itemsDropped.find(item => item.itemRenderId === getRenderId);
        if (a != undefined) {
            a.divClass = (a.content == 'sectioncontrol' || a.content == 'gridcontrol') ? "element-box-contents-for-stracture" : (a.content == 'dividercontrol') ? "element-box-contents-for-divider" : (a.content == 'spacercontrol') ? "element-box-contents-for-spacer" : "element-box-contents";
            a.showCustomDiv = true;
            check = true;
        }
        return check;
    }
    //Global function for showCustom Div
    public globalshowCustomEditDiv(getRenderId, getArrayType) {
        try {
            if (getArrayType == "Grid") {
                let getResponse = this.showGridItem(getRenderId);
                if (!getResponse)
                    this.showMainItem(getRenderId);
            }
            else {
                let getResponse = this.showMainItem(getRenderId);
                if (!getResponse)
                    this.showGridItem(getRenderId);
            }
            event.stopPropagation();
        }
        catch (e) {
        }
    }
}