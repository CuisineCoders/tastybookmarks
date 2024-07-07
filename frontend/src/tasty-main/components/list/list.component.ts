import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RecipeItem } from '../../models/recipe-item.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  recipes: RecipeItem[] = [
    { title: 'Vegetarische Tacos', imageUrl: './dummy-image-square-300x300.jpg' },
    { title: 'Süßkartoffel-Curry mit Kokosmilch', imageUrl: './dummy-image-square-300x300.jpg' },
    { title: 'Schokoladenmousse mit Himbeeren', imageUrl: './dummy-image-square-300x300.jpg' },
    { title: 'Gemüse-Tempura', imageUrl: './dummy-image-square-300x300.jpg' },
    { title: 'Mango-Chia-Pudding', imageUrl: './dummy-image-square-300x300.jpg' },
    { title: 'Zucchini-Fritters', imageUrl: './dummy-image-square-300x300.jpg' }
  ];

}
