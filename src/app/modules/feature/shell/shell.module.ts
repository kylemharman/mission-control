import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './containers/shell/shell.component';
import { SpacesBarComponent } from './components/spaces-bar/spaces-bar.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, ShellRoutingModule, MaterialModule, SharedModule],
  declarations: [ShellComponent, SpacesBarComponent],
})
export class ShellModule {}
