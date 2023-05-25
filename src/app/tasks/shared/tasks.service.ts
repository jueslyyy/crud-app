import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environmnet } from 'src/environment/environmnet';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  apiUrl: string = '';

  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = `${environmnet.api}/tasks`;
   }

  getAll(){
    return this.http.get<Task[]>(`${this.apiUrl}`);
  }

  // 1 forma de uso de environmnet
//   getById(id: string){
// return this.http.get<Task>(`${environmnet.api}/tasks/${id}`);
//   }

getById(id: string){
  return this.http.get<Task>(`${this.apiUrl}/${id}`);
    }

  save(task: Task){
    const taskBody = {
      description: task.description,
      completed: task.completed
    };
    if(task._id){
      return this.http.put<Task>(`${this.apiUrl}/${task._id}`,taskBody);
    }else {
       return this.http.post<Task>(`${this.apiUrl}`, taskBody);
    }
  }

  delete(id: string){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
