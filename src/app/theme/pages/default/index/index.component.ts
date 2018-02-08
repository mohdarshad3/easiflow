import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
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
    ]
})
export class IndexComponent implements OnInit, AfterViewInit {
    showSelected: boolean;
    showdataproperty: boolean;
    removeItemClass: boolean;
    showelEmentStyle: boolean = false;
    isRenderEle: boolean = false;
    isRenderEleId: number = 0;
    itemsGridDropped: Array<any> = [];
    createNewGrid: Array<any> = [];
    itemsDropped: Array<any> = [];
    autoRenderGrid: Array<any> = [];
    dropOverActive: boolean = false;
    arrayType: String;
    showBasicControl: boolean = false;
    itemRenderId: number;
    private itemsControlToRender: Array<any> = [
        {
            name: 'Title',
            iconClass: 'm-menu__link-icon flaticon-type',
            content: 'titlecontrol',
            itemclass: 'item-title'
        },
        {
            name: 'Label',
            iconClass: 'm-menu__link-icon fa fa-tag',
            content: 'labelcontrol',
            itemclass: 'item-label'
        },
        {
            name: 'Input',
            iconClass: 'm-menu__link-icon flaticon-login',
            content: 'inputcontrol',
            itemclass: 'item-input'
        },
        {
            name: 'Checkbox',
            iconClass: 'm-menu__link-icon flaticon-check-box-with-check-sign',
            content: 'checkboxcontrol',
            itemclass: 'item-checkbox'
        },
        {
            name: 'Datetime Compare',
            iconClass: 'm-menu__link-icon fa fa-compress',
            content: 'dtccontrol',
            itemclass: 'item-datetimeCompare'
        },
        {
            name: 'Datetime Picker',
            iconClass: 'm-menu__link-icon flaticon-calendar-with-a-clock-time-tools',
            content: 'dtpcontrol',
            itemclass: 'item-datetimePicker'
        },
        {
            name: 'Button',
            iconClass: 'm-menu__link-icon flaticon-round-toggle',
            content: 'buttoncontrol',
            itemclass: 'item-button'
        },
        {
            name: 'Drop Down',
            iconClass: 'm-menu__link-icon flaticon-drop',
            content: 'dropdowncontrol',
            itemclass: 'item-dropDown'
        },
        {
            name: 'Text Editor',
            iconClass: 'm-menu__link-icon flaticon-signs',
            content: 'tditorcontrol',
            itemclass: 'item-textEditor'
        },
        {
            name: 'Modal Popup',
            iconClass: 'm-menu__link-icon flaticon-form',
            content: 'modalcontrol',
            itemclass: 'item-modalPopup'
        },
        {
            name: 'Radio Button',
            iconClass: 'm-menu__link-icon fa fa-dot-circle-o',
            content: 'radiocontrol',
            itemclass: 'item-radioButton'
        },
        {
            name: 'Image Control',
            iconClass: 'm-menu__link-icon fa fa-picture-o',
            content: 'imageuploader',
            itemclass: 'item-imageControl'
        },
        {
            name: 'Form',
            iconClass: 'm-menu__link-icon fa fa-wpforms',
            content: 'formcontrol',
            itemclass: 'item-form'
        },
        {
            name: 'Paragraph',
            iconClass: 'm-menu__link-icon flaticon-paragraph',
            content: 'paragraphcontrol',
            itemclass: 'item-paragraph'
        },
        {
            name: 'Anchor link',
            iconClass: 'm-menu__link-icon flaticon-link',
            content: 'anchorcontrol',
            itemclass: 'item-anchorLink'
        },
        {
            name: 'Tabs',
            iconClass: 'm-menu__link-icon flaticon-new-tab',
            content: 'tabscontrol',
            itemclass: 'item-anchorLink'
        },
        {
            name: 'Section',
            iconClass: 'm-menu__link-icon flaticon-layout',
            content: 'sectioncontrol',
            itemclass: 'item-section'
        },
        {
            name: 'Divider',
            iconClass: 'm-menu__link-icon fa fa-th-large',
            content: 'dividercontrol',
            itemclass: 'item-divider'
        },
        {
            name: 'Spacer',
            iconClass: 'm-menu__link-icon fa fa-adjust',
            content: 'spacercontrol',
            itemclass: 'item-spacer'
        },
        {
            name: 'Grid',
            iconClass: 'm-menu__link-icon flaticon-grid',
            content: 'gridcontrol',
            itemclass: 'item-grid'
        },
        {
            name: 'File Attachment',
            iconClass: 'm-menu__link-icon flaticon-layout',
            content: 'fileattachmentcontrol',
            itemclass: 'item-section'
        },
        {
            name: 'Emded Video',
            iconClass: 'm-menu__link-icon flaticon-metal-paper-clip',
            content: 'embedvidcontrol',
            itemclass: 'item-divider'
        }
    ];
    constructor(private _script: ScriptLoaderService, private dragula: DragulaService) {
        dragula.setOptions('main-items', {
            removeOnSpill: false,
            accepts: (el: Element, target: Element, source: Element, sibling: Element): boolean => {
                return !el.contains(target);
            }
        });
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
    public addDropItem(renderItem) {
        this.dropOverActive = false;
        if (renderItem != undefined) {
            if (!this.isRenderEle) {
                renderItem = this.getMyRenderValue(renderItem);
                if (renderItem.name != undefined && renderItem.name != "") {
                    renderItem.arrayType = "Main Grid";
                    renderItem.showBasicControl = (renderItem.content != 'dividercontrol' && renderItem.content != 'gridcontrol' && renderItem.content != 'sectioncontrol' && renderItem.content != 'spacercontrol' && renderItem.content != 'fileattachmentcontrol' && renderItem.content != 'embedvidcontrol') ? true : false;
                    renderItem.itemRenderId = this.isRenderEleId = (this.autoRenderGrid.length + 1);
                    this.autoRenderGrid.push(renderItem.itemRenderId);
                    renderItem.divClass = (renderItem.content == 'sectioncontrol' || renderItem.content == 'gridcontrol') ? "element-box-contents-for-stracture" : (renderItem.content == 'dividercontrol') ? "element-box-contents-for-divider" : (renderItem.content == 'spacercontrol') ? "element-box-contents-for-spacer" : "element-box-contents";

                    renderItem.showElementDelete = renderItem.showelEmentStyle = false;
                    renderItem.showCustomDiv = renderItem.showAllDragEle = false;
                    this.itemsDropped.push(renderItem);
                    if (this.itemsDropped.length > 0)
                        this.showSelected = false;
                }
            }
            this.isRenderEle = false;
        }
    }
    //hide custome edit div
    public hideCustomEditDiv() {
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
        event.stopPropagation();
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
    public hideAllDivClass() {
        this.itemsDropped.forEach(function(item) {
            item.divClass = "";
            item.showCustomDiv = false;
        });
        this.itemsGridDropped.forEach(function(item, $index) {
            item.forEach(function(item, $index) {
                item.forEach(function(item, $index) {
                    item.divClass = "";
                    item.showCustomDiv = false;
                });
            });
        });
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
            this.hideAllDivClass();
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
        }
        catch (e) {
        }
    }
    public getMyRenderValue(renderItem) {
        switch (renderItem.dropData) {
            case "titlecontrol":
                renderItem.name = 'Title';
                renderItem.iconClass = 'm-menu__link-icon flaticon-type';
                renderItem.content = 'titlecontrol';
                renderItem.itemclass = 'item-title';
                break;
            case "labelcontrol":
                renderItem.name = 'Label';
                renderItem.iconClass = 'm-menu__link-icon fa fa-tag';
                renderItem.content = 'labelcontrol';
                renderItem.itemclass = 'item-label';
                break;
            case "inputcontrol":
                renderItem.name = 'Input';
                renderItem.iconClass = 'm-menu__link-icon flaticon-login';
                renderItem.content = 'inputcontrol';
                renderItem.itemclass = 'item-input';
                break;
            case "checkboxcontrol":
                renderItem.name = 'Checkbox';
                renderItem.iconClass = 'm-menu__link-icon flaticon-check-box-with-check-sign';
                renderItem.content = 'checkboxcontrol';
                renderItem.itemclass = 'item-checkbox';
                break;
            case "dtccontrol":
                renderItem.name = 'Datetime Compare';
                renderItem.iconClass = 'm-menu__link-icon fa fa-compress';
                renderItem.content = 'dtccontrol';
                renderItem.itemclass = 'item-datetimeCompare';
                break;
            case "dtpcontrol":
                renderItem.name = 'Datetime Picker';
                renderItem.iconClass = 'm-menu__link-icon flaticon-calendar-with-a-clock-time-tools';
                renderItem.content = 'dtpcontrol';
                renderItem.itemclass = 'item-datetimePicker';
                break;
            case "buttoncontrol":
                renderItem.name = 'Button';
                renderItem.iconClass = 'm-menu__link-icon flaticon-round-toggle';
                renderItem.content = 'buttoncontrol';
                renderItem.itemclass = 'item-button';
                break;
            case "dropdowncontrol":
                renderItem.name = 'Drop Down';
                renderItem.iconClass = 'm-menu__link-icon flaticon-drop';
                renderItem.content = 'dropdowncontrol';
                renderItem.itemclass = 'item-dropDown';
                break;
            case "tditorcontrol":
                renderItem.name = 'Text Editor';
                renderItem.iconClass = 'm-menu__link-icon flaticon-signs';
                renderItem.content = 'tditorcontrol';
                renderItem.itemclass = 'item-textEditor';
                break;
            case "modalcontrol":
                renderItem.name = 'Modal Popup';
                renderItem.iconClass = 'm-menu__link-icon flaticon-form';
                renderItem.content = 'modalcontrol';
                renderItem.itemclass = 'item-modalPopup';
                break;
            case "radiocontrol":
                renderItem.name = 'Radio Button';
                renderItem.iconClass = 'm-menu__link-icon fa fa-dot-circle-o';
                renderItem.content = 'radiocontrol';
                renderItem.itemclass = 'item-radioButton';
                break;
            case "imageuploader":
                renderItem.name = 'Image Control';
                renderItem.iconClass = 'm-menu__link-icon fa fa-picture-o';
                renderItem.content = 'imageuploader';
                renderItem.itemclass = 'item-imageControl';
                break;
            case "formcontrol":
                renderItem.name = 'Form';
                renderItem.iconClass = 'm-menu__link-icon fa fa-wpforms';
                renderItem.content = 'formcontrol';
                renderItem.itemclass = 'item-form';
                break;
            case "paragraphcontrol":
                renderItem.name = 'Paragraph';
                renderItem.iconClass = 'm-menu__link-icon flaticon-paragraph';
                renderItem.content = 'paragraphcontrol';
                renderItem.itemclass = 'item-paragraph';
                break;
            case "anchorcontrol":
                renderItem.name = 'Anchor link';
                renderItem.iconClass = 'm-menu__link-icon flaticon-link';
                renderItem.content = 'anchorcontrol';
                renderItem.itemclass = 'item-anchorLink';
                break;
            case "tabscontrol":
                renderItem.name = 'Tabs';
                renderItem.iconClass = 'm-menu__link-icon flaticon-new-tab';
                renderItem.content = 'tabscontrol';
                renderItem.itemclass = 'item-anchorLink';
                break;
            case "sectioncontrol":
                renderItem.name = 'Section';
                renderItem.iconClass = 'm-menu__link-icon flaticon-layout';
                renderItem.content = 'sectioncontrol';
                renderItem.itemclass = 'item-section';
                break;
            case "dividercontrol":
                renderItem.name = 'Divider';
                renderItem.iconClass = 'm-menu__link-icon fa fa-th-large';
                renderItem.content = 'dividercontrol';
                renderItem.itemclass = 'item-divider';
                break;
            case "spacercontrol":
                renderItem.name = 'Spacer';
                renderItem.iconClass = 'm-menu__link-icon fa fa-adjust';
                renderItem.content = 'spacercontrol';
                renderItem.itemclass = 'item-spacer';
                break;
            case "gridcontrol":
                renderItem.name = 'Grid';
                renderItem.iconClass = 'm-menu__link-icon flaticon-grid';
                renderItem.content = 'gridcontrol';
                renderItem.itemclass = 'item-grid';
                break;
            case "fileattachmentcontrol":
                renderItem.name = 'File Attachment';
                renderItem.iconClass = 'm-menu__link-icon flaticon-layout';
                renderItem.content = 'fileattachmentcontrol';
                renderItem.itemclass = 'item-section';
                break;
            case "embedvidcontrol":
                renderItem.name = 'Emded Video';
                renderItem.iconClass = 'm-menu__link-icon flaticon-metal-paper-clip';
                renderItem.content = 'embedvidcontrol';
                renderItem.itemclass = 'item-divider';
                break;
            default:
                renderItem = "";
        }
        return renderItem;
    }
}