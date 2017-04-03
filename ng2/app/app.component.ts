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
    currentUser: User;

    constructor(private router: Router, private authService: AuthenticationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}