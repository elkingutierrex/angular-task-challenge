import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../../../core/services/auth.service';
import { TaskService } from '../../../../core/services/task.service';
import { TaskItemComponent } from '../components/task-item/task-item';
import { Task } from '../../../../core/models/task.model';

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
    TaskItemComponent
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskListComponent implements OnInit {
  private authService = inject(AuthService);
  private taskService = inject(TaskService);
  private fb = inject(FormBuilder);

  tasks = this.taskService.sortedTasks;
  currentUser = this.authService.currentUser;

  taskForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['']
  });

  ngOnInit() {
    this.taskService.loadTasks();
  }

  onLogout() {
    this.authService.logout();
  }

  onToggle(task: Task) {
    this.taskService.toggleTaskCompletion(task).subscribe();
  }

  onDelete(task: Task) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(task.id).subscribe();
    }
  }

  onEdit(task: Task) {
    const newTitle = prompt('Edit Title:', task.title);
    if (newTitle) {
      this.taskService.updateTask({ ...task, title: newTitle }).subscribe();
    }
  }

  onAddTask() {
    if (this.taskForm.invalid) return;

    const { title, description } = this.taskForm.value;
    this.taskService.addTask({ title, description }).subscribe(() => {
      this.taskForm.reset();
      // Optional: Focus back on title?
    });
  }
}
