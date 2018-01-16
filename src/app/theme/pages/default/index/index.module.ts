import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropDirectiveModule} from "angular4-drag-drop";
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { ImageUploaderComponent } from '../app-tools/imageuploader/image-uploader.component';
import { InputControlComponent } from '../app-tools/inputcontrol/input-control.component';
import { TitleControlComponent } from '../app-tools/titlecontrol/title-control.component';
import { CheckboxControlComponent } from '../app-tools/checkboxcontrol/checkbox-control.component';
import { LabelControlComponent } from '../app-tools/labelcontrol/label-control.component';


const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": IndexComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule,DragDropDirectiveModule
    ], exports: [
        RouterModule
    ], declarations: [
        IndexComponent,
		ImageUploaderComponent,
		InputControlComponent,
		TitleControlComponent,
		CheckboxControlComponent,
		LabelControlComponent,
    ]
})
export class IndexModule {



}