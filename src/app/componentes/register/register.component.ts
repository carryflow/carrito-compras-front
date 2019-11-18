import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User;
  public status: string;

  constructor(    
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) { 
    this.user = new User("","","","","","","ROLE_USER","");
  }

  ngOnInit() {
  }

  onSubmit(form){
    this._userService.register(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          console.log(response.user);
          this.status = 'success';
          form.reset();
        }else{
          this.status = 'error';
        }
      },
      error => {
        console.log(<any> error);
      }
    );
  }

}
