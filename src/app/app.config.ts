import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
import { TaskRepository } from './core/repositories/task.repository';
import { MockTaskRepository } from './data/infrastructure/mock-task.repository';
import { AuthRepository } from './core/repositories/auth.repository';
import { MockAuthRepository } from './data/infrastructure/mock-auth.repository';

const taskRepoProvider = environment.useMock
  ? { provide: TaskRepository, useClass: MockTaskRepository }
  : { provide: TaskRepository, useClass: MockTaskRepository }; // Fallback until API implementation

const authRepoProvider = environment.useMock
  ? { provide: AuthRepository, useClass: MockAuthRepository }
  : { provide: AuthRepository, useClass: MockAuthRepository };

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    taskRepoProvider,
    authRepoProvider
  ]
};
