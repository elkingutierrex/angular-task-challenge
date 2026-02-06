import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../../../../core/models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatButtonModule, MatIconModule],
  template: `
    <mat-card class="task-card" [class.completed]="task.isCompleted">
      <div class="task-content">
        <mat-checkbox 
          [checked]="task.isCompleted" 
          (change)="onToggle()"
          color="primary">
        </mat-checkbox>
        <div class="task-info">
          <h3 [class.strike]="task.isCompleted">{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <span class="date">{{ task.createdAt | date:'mediumDate' }}</span>
        </div>
      </div>
      <div class="task-actions">
        <button mat-icon-button color="primary" (click)="onEdit()">
            <mat-icon>edit</mat-icon>
        </button>
        <button mat-icon-button color="warn" (click)="onDelete()">
            <mat-icon>delete</mat-icon>
        </button>
      </div>
    </mat-card>
  `,
  styleUrls: ['./task-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;
  @Output() toggle = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onToggle() {
    this.toggle.emit();
  }

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
