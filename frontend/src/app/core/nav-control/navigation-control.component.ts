import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TastyNavigationControl } from './navigation-control.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector:        'tasty-nav-control',
  templateUrl:     'navigation-control.component.html',
  styleUrl:        './navigation-control.component.scss',
  host:            { 'class': 'tasty-nav-control' },
  imports:         [MatButtonModule, MatIconModule],
  standalone:      true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationControlComponent {
  private readonly navControl = inject(TastyNavigationControl);


  protected addButton = computed(
    () => this.navControl.displayButtons().find(({ option }) => option === 'AddRecipeButton'));
  protected deleteButton = computed(
    () => this.navControl.displayButtons().find(({ option }) => option === 'DeleteRecipeButton'));
}