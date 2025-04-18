import { Injectable, signal } from '@angular/core';

export interface TastyNavigationButtonOption {
  option: 'CreateRecipeButton' | 'DeleteRecipeButton' | 'ImportRecipeButton';
  clickAction?: () => void ;
}

@Injectable({ providedIn: 'root' })
export class TastyNavigationControl {
  private readonly _availableButtons = signal<Array<TastyNavigationButtonOption>>([]);


  public displayButtons(buttons: Array<TastyNavigationButtonOption>) {
    this._availableButtons.set(buttons);
  }

  public buttonsToDisplay(): Array<TastyNavigationButtonOption> {
    return this._availableButtons();
  }
}