import { Component, OnInit, ViewEncapsulation, Input, Output } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { IndexComponent } from '../../index/index.component';

@Component({
    selector: 'fileattachment-control',
    templateUrl: './fileattachment-control.component.html',
    styleUrls: ['./fileattachment-control.component.css'],
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
export class FileattAchmentControlComponent {
    //initialize variable
    @Input() arrayType: String;
    @Input() itemRenderId: number;
    @Input() showElementDelete: boolean;
    @Input() showelEmentStyle: boolean;
    @Input() showCustomDiv: boolean;
    fileName: any;
    constructor(public indexcomponent: IndexComponent) {
    }
    ngOnInit($event) {
        this.fileName = 'Choose file';
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.indexcomponent.globalShowParticularElement(this.itemRenderId, this.arrayType);
        });
    }
    //remove item from array
    public removeItem(myitemRenderId, myArrayType) {
        if (myitemRenderId != '' && myArrayType != '')
            this.indexcomponent.globalRemoveItem(myitemRenderId, myArrayType);
    }
    //hide remove dialog item
    public removeDailog() {
        this.showelEmentStyle = false;
        this.showElementDelete = (!this.showElementDelete) ? true : false;
        event.stopPropagation();
    }
    //hide remove item
    public hideRemoveItem() {
        this.showElementDelete = false;
        event.stopPropagation();
    }
    //show custom edit div
    public showCustomEditDiv(getRenderId, getArrayType) {
        if (getRenderId != '' && getArrayType != ''){
			this.showElementDelete = false;
            this.indexcomponent.globalshowCustomEditDiv(getRenderId, getArrayType);
		}
    }
    //toggle function view property
    public toggleEmentStyle() {
        event.stopPropagation();
    }
    public onFileChange(event) {
        this.fileName = event.target.files[0].name;
        event.stopPropagation();
    }
}