import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './search.html',
  styleUrls: ['./search.scss'],
})
export class Search {}