import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TastyFabControl } from './fab-control.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector:        'tasty-fab-control',
  templateUrl:     'fab-control.component.html',
  styleUrl:        './fab-control.component.scss',
  host:            { 'class': 'tasty-fab-control' },
  imports: [MatButtonModule, MatIconModule, MatTooltip],
  standalone:      true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabControlComponent {
  private readonly fabControl = inject(TastyFabControl);


  protected importButton = computed(
    () => this.fabControl.buttonsToDisplay().find(({ option }) => option === 'ImportRecipeButton'));
  protected deleteFab = computed(
    () => this.fabControl.buttonsToDisplay().find(({ option }) => option === 'DeleteRecipeButton'));
  protected createButton = computed(
    () => this.fabControl.buttonsToDisplay().find(({ option }) => option === 'CreateRecipeButton'));
}