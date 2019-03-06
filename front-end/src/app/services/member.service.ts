import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Member } from '../models/member';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http : HttpClient, private route : ActivatedRoute, private router : Router) { }

  IsLoggedIn() : boolean{
    const token = localStorage.getItem('token');
    if(token){
      return true;
    }
    else{
      this.router.navigate(['login']);
      return false;
    }
  }

  LoginAccount(obj : Member){
    return this.http.post(this.apiUrl+'/login',obj);
  }

  RegisterAccount(obj : Member){
    return this.http.post(this.apiUrl+'/todo/registration', obj);
  }

  GetToken(username : string) {
    return this.http.get(this.apiUrl+'/todo/getToken/'+username);
  }

}