import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  public identity;
  constructor(
    private _userService: UserService
  ){

  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
  }
}
