import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';
import { Response } from 'selenium-webdriver/http';
import { Token } from 'src/app/models/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token : Token;

  member : Member;

  status : any;

  constructor(private memberService : MemberService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {
  }

  LoginAccount(username : HTMLInputElement, password : HTMLInputElement){
    const loginAccount : Member = {
      username : username.value,
      password : password.value
    }

    this.memberService.LoginAccount(loginAccount).subscribe((response : any)=>{
      this.memberService.GetToken(username.value).subscribe((resp : Token) => {
        if(resp != null){
          this.token = resp;
          console.log(resp);
          localStorage.setItem('token', resp.token);
          localStorage.setItem('userInfo', JSON.stringify(resp));
          this.router.navigate(['todolist']);
        }
      });
    },(error : Response) => {
      this.status = error.status;
    }
    );
  }

}
