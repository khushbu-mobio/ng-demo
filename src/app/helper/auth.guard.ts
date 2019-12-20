import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({ providedIn: 'root' })

/**
 *  used to prevent unauthenticated users from accessing restricted routes
 */
export class AuthGurd implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    /**
     * check route can be activated  or not
     * @param route 
     * @param state 
     * @author khushbu shah
     */
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