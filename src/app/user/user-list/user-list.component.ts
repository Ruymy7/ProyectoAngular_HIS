import { Component } from '@angular/core';
import { UserService } from '../user.service'
import { Professional } from 'src/app/models/professional.model';
import { Patient } from 'src/app/models/patient.model';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  patients: Patient[]
  professionals: Professional[]
  patientDisplayedColumns = ['NHC', 'name', 'lastName', 'gender', 'edit', 'delete']
  professionalDisplayedColumns = ['medicalBoardNumber', 'name', 'lastName', 'gender', 'edit', 'delete']

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(result => {
      result.forEach((r: Patient | Professional) => {
        if (r.hasOwnProperty('NHC')) {
          if (this.patients) this.patients.push(<Patient>r)
          else this.patients = [<Patient>r]
        } else {
          if (this.professionals) this.professionals.push(<Professional>r)
          else this.professionals = [<Professional>r]
        }
      })
    })
  }

  getUser(row: User): void {
    this.router.navigate(['/users/'+row.id])
  }
}
