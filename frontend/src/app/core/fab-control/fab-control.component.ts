import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TastyFabControl } from './fab-control.service';
import { filter } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddRecipeDialogComponent } from '../../recipe/components/add-dialog/add-recipe-dialog.component';

@Component({
  selector:        'tasty-fab-control',
  templateUrl:     'fab-control.component.html',
  styleUrl:        './fab-control.component.scss',
  imports:         [MatButtonModule, MatIconModule],
  standalone:      true,
<<<<<<<< HEAD:frontend/src/app/core/fab-control/fab-control.component.ts
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabControlComponent {
========
  imports:         [CommonModule, RouterOutlet, RouterLink, MatButtonModule, MatIconModule],
  templateUrl:     './app.component.html',
  styleUrl:        './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
>>>>>>>> origin/jan/frontend/delete-button/detail-view:frontend/src/app/app.component.ts
  private readonly dialog = inject(MatDialog);
  protected readonly fabControl = inject(TastyFabControl);

  protected addFab = computed(
    () => this.fabControl.displayButtons().some(({ option }) => option === 'AddRecipeButton'));
  protected deleteFab = computed(
    () => this.fabControl.displayButtons().find(({ option }) => option === 'DeleteRecipeButton'));

  protected openDialog(): void {
    this.dialog.open<AddRecipeDialogComponent, null, string | undefined>(AddRecipeDialogComponent, { width: '450px' })
        .afterClosed()
        .pipe(filter(event => event !== undefined))
        .subscribe(result => console.log('URL:', result));
  }
}