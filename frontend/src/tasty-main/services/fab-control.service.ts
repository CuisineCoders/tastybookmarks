import {computed, Injectable, Signal, signal} from "@angular/core";

export type TastyButtonOptions = 'AddRecipeButton' | 'DeleteRecipeButton'

@Injectable({providedIn: 'root'})
export class TastyFabControl {
  private _showButtons = signal<Array<TastyButtonOptions>>(['AddRecipeButton']);

  public set displayButtons(buttons: Array<TastyButtonOptions>) {
    this._showButtons.set(buttons)
  }
  public get displayButtons(): Signal<Array<TastyButtonOptions>> {
    return computed(() => this._showButtons())
  }
}
