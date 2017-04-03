import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, Customer } from '../../_models/index';
import { AuthenticationService, CustomerService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'list.component.html'
})

export class UserListComponent implements OnInit {
    currentUser: User;
    customers: Customer[] = [];

    constructor(
        private router: Router, 
        private customerService: CustomerService, 
        private authService: AuthenticationService
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.load();
    }

    delete(id: number) {
        if(confirm('Are you sure to delete this customer?')) {
            this.customerService.delete(id).subscribe(() => { this.load() });
        }
    }

    private load() {
        this.customerService.getAll().subscribe(customers => { this.customers = customers; });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}