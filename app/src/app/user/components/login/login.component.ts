import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild(NgForm) form!: NgForm;

  constructor(private userService: AuthService, private router: Router) {}

  login(): void {
    if (this.form?.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are mandatory',
      });
      return;
    }
    this.userService.login(this.form.value).subscribe({
      next: () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login successfull!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.error.message}`,
        });
      },
    });
  }
}
