import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { Task } from '../../../../../core/services/task';
import { TaskService } from '../../../../../core/services/task.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingService } from '../../../../../core/services/loading.service';

@Component({
  selector: 'app-task-dialog',
  imports: [
    ReactiveFormsModule,
    TaskDialog,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatIcon,
    MatFormField,
    MatLabel,
    MatError],
  templateUrl: './task-dialog.html',
  styleUrl: './task-dialog.scss',
})
export class TaskDialog {
  private fb = inject(FormBuilder);


  private taskService = inject(TaskService);
  private loadingService = inject(LoadingService);
  tasks = this.taskService.sortedTasks;

  taskForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['']
  });

  onAddTask() {
    if (this.taskForm.invalid) return;

    const { title, description } = this.taskForm.value;
    this.loadingService.show();
    this.taskService.addTask({ title, description }).subscribe(() => {
      this.taskForm.reset();
      this.loadingService.hide();
    });
  }


  // onEdit(task: Task) {
  //   const newTitle = prompt('Edit Title:', task.title);
  //   if (newTitle) {
  //     this.loadingService.show();
  //     this.taskService.updateTask({ ...task, title: newTitle }).subscribe(() => this.loadingService.hide());
  //   }
  // }

}
