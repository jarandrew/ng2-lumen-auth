import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './_models/index';
import { AuthenticationService } from './_services/index';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit { 
    constructor(private router: Router, private authService: AuthenticationService) {
        
    }

    ngOnInit() {
        
    }

    get currentUser() {
        return this.authService.getCurrentUser();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}