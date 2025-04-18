import { ChangeDetectionStrategy, Component, computed, inject, isDevMode } from '@angular/core';
import { TastyNavigationControl } from './navigation-control.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

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
  private readonly router = inject(Router);

  protected importButton = computed(
    () => this.navControl.buttonsToDisplay().find(({ option }) => option === 'ImportRecipeButton'));
  protected deleteButton = computed(
    () => this.navControl.buttonsToDisplay().find(({ option }) => option === 'DeleteRecipeButton'));
  protected createButton = computed(
    () => this.navControl.buttonsToDisplay().find(({ option }) => option === 'CreateRecipeButton'),
  );


  protected createRecipe(): void {
    this.router.navigate(['recipes/create']).then(() => console.log('navigate to create'));
  }

  protected readonly isDevMode = isDevMode;
}