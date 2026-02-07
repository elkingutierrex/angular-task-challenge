import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../../core/services/auth.service';
import { TaskService } from '../../../../core/services/task.service';
import { TaskItemComponent } from '../components/task-item/task-item';
import { Task } from '../../../../core/models/task.model';
import { LoadingService } from '../../../../core/services/loading.service';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { TaskDialogComponent, TaskDialogData } from '../components/task-dialog/task-dialog';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    TaskItemComponent,
    Navbar
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskListComponent implements OnInit {
  private authService = inject(AuthService);
  private taskService = inject(TaskService);
  private dialog = inject(MatDialog);
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
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      panelClass: 'glass-dialog-panel',
      data: { task } as TaskDialogData
    });

    dialogRef.afterClosed().subscribe((result: Task | undefined) => {
      if (result) {
        this.loadingService.show();
        this.taskService.updateTask(result).subscribe(() => this.loadingService.hide());
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      panelClass: 'glass-dialog-panel'
    });

    dialogRef.afterClosed().subscribe((result: { title: string; description: string } | undefined) => {
      if (result) {
        this.loadingService.show();
        this.taskService.addTask(result).subscribe(() => this.loadingService.hide());
      }
    });
  }
}
