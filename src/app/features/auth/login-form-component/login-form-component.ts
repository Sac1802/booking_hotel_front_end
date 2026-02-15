import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form-component.html',
  styleUrl: './login-form-component.scss',
})
export class LoginFormComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  loading = input(false);
  error = input<number | null>(null);

  formSubmit = output<{ email: string; password: string }>();

  constructor() {}

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value as { email: string; password: string });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
