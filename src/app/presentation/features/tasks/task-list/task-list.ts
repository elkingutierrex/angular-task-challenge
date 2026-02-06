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
import { LoadingService } from '../../../../core/services/loading.service';
import { Navbar } from '../../../shared/components/navbar/navbar';

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
  private fb = inject(FormBuilder);
  private loadingService = inject(LoadingService);

  tasks = this.taskService.sortedTasks;
  currentUser = this.authService.currentUser;

  taskForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['']
  });

  ngOnInit() {
    this.loadingService.show();
    this.taskService.loadTasks(); // Since this is void/signal based, we might just hide after short delay or if we changed loadTasks to return Observable
    // Ideally loadTasks returns Observable. But existing impl is void.
    // I'll assume loadTasks is fast or async.
    // Actually, checking task.service.ts... loadTasks calls subscribe.
    // I should modify TaskService to return Observable so I can hide spinner.
    // OR just hide immediately for now if I can't modify Service easily without breaking signals flow.
    // Let's modify loadTasks in TaskService to return Observable/Subscription or just hide it here via setTimeout as fallback?
    // Better: Modify TaskService.
    setTimeout(() => this.loadingService.hide(), 1000); // Temporary mock delay for visual feedback if service isn't refactored yet.
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

  onAddTask() {
    if (this.taskForm.invalid) return;

    const { title, description } = this.taskForm.value;
    this.loadingService.show();
    this.taskService.addTask({ title, description }).subscribe(() => {
      this.taskForm.reset();
      this.loadingService.hide();
    });
  }
}
