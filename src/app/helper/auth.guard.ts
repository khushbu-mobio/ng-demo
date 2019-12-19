import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';


@Injectable({ providedIn: 'root' })
export class AuthGurd implements CanActivate {
    
    constructor(private router: Router, private authenticationService: AuthenticationService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.CurrentUserValue;
        if (currentUser) {
            /** currentuser logged in return true */
            return true;
        }
        /** currentuser not logged in so redirect login page */
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}