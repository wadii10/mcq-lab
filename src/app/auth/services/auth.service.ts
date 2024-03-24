import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor( private http:HttpClient ) {}

  user = new Subject();

  createUser(model:any){
    return this.http.post(environment.baseApi+'students', model);
  }

  login(model:any){
    return this.http.put(environment.baseApi+'login/1', model);
  }

  getUsers(type:any){
    return this.http.get(environment.baseApi+type);
  }

  getStudent(id:number){
    return this.http.get(environment.baseApi+'students/'+id);
  }

  updateStudent(id:number, model:any){
    return this.http.put(environment.baseApi+'students/'+id, model);
  }

  getRole(){
    return this.http.get(environment.baseApi+'login/1');
  }
  
}
