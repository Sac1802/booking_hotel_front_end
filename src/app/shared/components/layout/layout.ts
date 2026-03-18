import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from './side-menu/side-menu';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SideMenu],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class Layout { }
