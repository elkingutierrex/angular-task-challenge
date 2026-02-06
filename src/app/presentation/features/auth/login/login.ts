import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  isLoading = false;

  onSubmit() {
    console.log('welcome');

    if (this.emailControl.invalid) return;

    const email = this.emailControl.value!;
    this.isLoading = true;

    this.authService.findUser(email).subscribe({
      next: (user) => {
        this.isLoading = false;
        if (user) {
          this.authService.setCurrentUser(user);
          this.router.navigate(['/tasks']);
        } else {
          this.openConfirmDialog(email);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  openConfirmDialog(email: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { email }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.authService.createUser(email).subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(['tasks']);
          },
          error: () => this.isLoading = false
        });
      }
    });
  }
}
