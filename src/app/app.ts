import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconService } from './core/services/icon.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('hotel-frontend');
  private _icons = inject(IconService);
}
