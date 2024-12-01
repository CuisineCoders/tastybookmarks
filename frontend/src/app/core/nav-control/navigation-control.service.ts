import {computed, Injectable, Signal, signal} from "@angular/core";

export interface TastyNavigationButtonOption {
  option: 'AddRecipeButton' | 'DeleteRecipeButton';
  clickAction: () => void;
}

@Injectable({providedIn: 'root'})
export class TastyNavigationControl {
  private readonly _showButtons = signal<Array<TastyNavigationButtonOption>>([]);


  public set displayButtons(buttons: Array<TastyNavigationButtonOption>) {
    this._showButtons.set(buttons)
  }

  public get displayButtons(): Signal<Array<TastyNavigationButtonOption>> {
    return computed(() => this._showButtons())
  }
}