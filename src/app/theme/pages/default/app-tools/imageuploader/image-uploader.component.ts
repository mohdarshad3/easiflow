import { Component, OnInit, ViewEncapsulation, Input, Output } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { IndexComponent } from '../../index/index.component';
@Component({
    selector: 'image-uploader',
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.css'],
    inputs: ['activeColor', 'baseColor', 'overlayColor', 'iconColor', 'borderColor'],
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
export class ImageUploaderComponent {
    //initialize variable
    @Input() arrayType: String;
    @Input() itemRenderId: number;
    @Input() showElementDelete: boolean;
    @Input() showelEmentStyle: boolean;
    @Input() showCustomDiv: boolean;
    iconColor: string;
    borderColor: string;
    activeColor: string = 'green';
    baseColor: string = '#ccc';
    overlayColor: string = 'rgba(255,255,255,0.5)';
    dragging: boolean = false;
    loaded: boolean = false;
    imageLoaded: boolean = false;
    imageSrc: string = '';
    constructor(public indexcomponent: IndexComponent) {
    }
    ngOnInit($event) {

    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.indexcomponent.globalShowParticularElement(this.itemRenderId, this.arrayType);
        });
    }
    //remove item from array
    private removeItem(myitemRenderId, myArrayType) {
        if (myitemRenderId != '' && myArrayType != '')
            this.indexcomponent.globalRemoveItem(myitemRenderId, myArrayType);
    }
    //hide remove dialog item
    private removeDailog() {
        this.showelEmentStyle = false;
        this.showElementDelete = (!this.showElementDelete) ? true : false;
        event.stopPropagation();
    }
    //hide remove item
    private hideRemoveItem() {
        this.showElementDelete = false;
        event.stopPropagation();
    }
    //show custom edit div
    private showCustomEditDiv(getRenderId, getArrayType) {
        if (getRenderId != '' && getArrayType != '')
            this.indexcomponent.globalshowCustomEditDiv(getRenderId, getArrayType);
    }
    //toggle function view property
    private toggleEmentStyle() {
        event.stopPropagation();
    }
    handleDragEnter() {
        this.dragging = true;
    }

    handleDragLeave() {
        this.dragging = false;
    }

    handleDrop(e) {
        e.preventDefault();
        this.dragging = false;
        this.handleInputChange(e);
    }

    handleImageLoad() {
        this.imageLoaded = true;
        this.iconColor = this.overlayColor;
    }

    handleInputChange(e) {
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

        var pattern = /image-*/;
        var reader = new FileReader();

        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }

        this.loaded = false;

        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }

    _handleReaderLoaded(e) {
        var reader = e.target;
        this.imageSrc = reader.result;
        this.loaded = true;
    }

    _setActive() {
        this.borderColor = this.activeColor;
        if (this.imageSrc.length === 0) {
            this.iconColor = this.activeColor;
        }
    }

    _setInactive() {
        this.borderColor = this.baseColor;
        if (this.imageSrc.length === 0) {
            this.iconColor = this.baseColor;
        }
    }

}