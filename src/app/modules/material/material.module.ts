import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { TooltipModule } from 'ng2-tooltip-directive';

const modules = [
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatMenuModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatButtonToggleModule,
  MatAutocompleteModule,
  LayoutModule,
  FlexLayoutModule,
  TooltipModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
];

@NgModule({
  imports: [
    CommonModule,
    TooltipModule.forRoot({
      'hide-delay': 0,
      'show-delay': 100,
      'tooltip-class': 'mat-small',
    }),
    ...modules,
  ],
  exports: [...modules],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
})
export class MaterialModule {}
