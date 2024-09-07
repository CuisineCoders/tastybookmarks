import {computed, Injectable, Signal, signal} from "@angular/core";

export interface TastyButtonOption {
  option: 'AddRecipeButton' | 'DeleteRecipeButton';
  clickAction?: () => void;
}

@Injectable({providedIn: 'root'})
export class TastyFabControl {
  private readonly _showButtons = signal<Array<TastyButtonOption>>([{option: 'AddRecipeButton'}]);


  public set displayButtons(buttons: Array<TastyButtonOption>) {
    this._showButtons.set(buttons)
  }

  public get displayButtons(): Signal<Array<TastyButtonOption>> {
    return computed(() => this._showButtons())
  }
}
