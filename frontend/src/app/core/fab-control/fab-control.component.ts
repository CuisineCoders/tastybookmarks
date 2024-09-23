import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TastyFabControl } from './fab-control.service';
import { AddRecipeDialogComponent } from '../../recipe/components';
import { filter } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector:        'tasty-fab-control',
  templateUrl:     'fab-control.component.html',
  styleUrl:        './fab-control.component.scss',
  imports:         [MatButtonModule, MatIconModule],
  standalone:      true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabControlComponent {
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