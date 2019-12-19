import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';
import { User } from './Model/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.cureentUser.subscribe(x => this.currentUser = x);
    }

    /** navigate to login page */
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
