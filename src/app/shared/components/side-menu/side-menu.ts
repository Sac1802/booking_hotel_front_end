import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './side-menu.html',
  styleUrls: ['./side-menu.scss']
})
export class SideMenu {
  auth = inject(AuthService);

  logout(){
    this.auth.logout();
  }
}
