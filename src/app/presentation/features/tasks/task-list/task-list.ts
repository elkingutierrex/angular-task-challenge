import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../../../core/services/auth.service';
import { TaskService } from '../../../../core/services/task.service';
import { TaskItemComponent } from '../components/task-item/task-item';
import { Task } from '../../../../core/models/task.model';
import { LoadingService } from '../../../../core/services/loading.service';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { TaskDialog } from '../components/task-dialog/task-dialog';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    TaskItemComponent,
    Navbar
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskListComponent implements OnInit {
  private authService = inject(AuthService);
  private taskService = inject(TaskService);
  readonly dialog = inject(MatDialog);

  private loadingService = inject(LoadingService);

  tasks = this.taskService.sortedTasks;
  currentUser = this.authService.currentUser;



  ngOnInit() {
    this.loadingService.show();
    this.taskService.loadTasks();
    setTimeout(() => this.loadingService.hide(), 1000);
  }



  onToggle(task: Task) {
    this.taskService.toggleTaskCompletion(task).subscribe();
  }

  onDelete(task: Task) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.loadingService.show();
      this.taskService.deleteTask(task.id).subscribe(() => this.loadingService.hide());
    }
  }

  onEdit(task: Task) {
    const newTitle = prompt('Edit Title:', task.title);
    if (newTitle) {
      this.loadingService.show();
      this.taskService.updateTask({ ...task, title: newTitle }).subscribe(() => this.loadingService.hide());
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(TaskDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }




}
