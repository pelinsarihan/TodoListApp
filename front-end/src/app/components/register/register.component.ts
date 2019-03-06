import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  status : any;

  constructor(private memberService : MemberService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {
  }

  RegisterAccount(fName : HTMLInputElement, lName : HTMLInputElement,username : HTMLInputElement,
    email : HTMLInputElement, password : HTMLInputElement){
      
    const newMember: Member = {
      firstName : fName.value,
      lastName : lName.value,
      username : username.value,
      email : email.value,
      password : password.value,
      createdDate : new Date()
    }

    this.memberService.RegisterAccount(newMember).subscribe((resp : any) => {
    },(error : Response)=>{
      this.status = error.status;
    });

    fName.value = '';
    lName.value = '';
    username.value = '';
    password.value = '';
    email.value = '';

  }

}
