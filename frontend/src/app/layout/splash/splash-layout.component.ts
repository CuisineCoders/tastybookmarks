import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'tasty-splash-layout',
    standalone: true,
    imports: [RouterOutlet],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<router-outlet></router-outlet>`,
})
export class SplashLayoutComponent { }
