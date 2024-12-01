import { Injectable, signal } from '@angular/core';

export interface TastyButtonOption {
  option: 'ImportRecipeButton' | 'DeleteRecipeButton' | 'CreateRecipeButton';
  clickAction: () => void;
}

@Injectable({providedIn: 'root'})
export class TastyFabControl {
  private readonly _availableButtons = signal<Array<TastyButtonOption>>([]);

  public displayButtons(buttons: Array<TastyButtonOption>) {
    this._availableButtons.set(buttons)
  }

  public buttonsToDisplay(): Array<TastyButtonOption> {
    return this._availableButtons()
  }
}