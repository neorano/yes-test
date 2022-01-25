import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Technician } from 'src/common/technician';
import { Observable } from 'rxjs';
import { Task } from 'src/common/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.serverAddress+"/main";
  }
  public findAll(): Observable<Technician[]> {
    return this.http.get<Technician[]>(this.url+"/all");
  }

  public add(task:Task, id:number){
  
    return this.http.post<Task>(this.url+"/"+id,task);
  }



}
