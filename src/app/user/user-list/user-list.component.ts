import { Component, ViewChild } from '@angular/core';
import { UserService } from '../user.service'
import { Professional } from 'src/app/models/professional.model';
import { Patient } from 'src/app/models/patient.model';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog/dialog.component';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  patients: Patient[]
  professionals: Professional[]
  patientDisplayedColumns = ['NHC', 'name', 'lastName', 'gender', 'more', 'edit', 'delete']
  professionalDisplayedColumns = ['medicalBoardNumber', 'name', 'lastName', 'type', 'more', 'edit', 'delete']
  selectedTab: number = 0

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) { }
  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  
  private getAllUsers() {
    this.userService.getAllUsers().subscribe(result => {
      this.patients = []
      this.professionals = []
      result.forEach((r: Patient | Professional) => {
        if (r.hasOwnProperty('NHC')) {
          this.patients.push(<Patient>r)
        } else {
          this.professionals.push(<Professional>r)
        }
      })
    })
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

  ngAfterViewInit(): void {
    this.selectedTab = this.tabGroup.selectedIndex
  }

  getUser(row: User): void {
    this.router.navigate(['/users/' + row._id])
  }

  deleteUser(row: User): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { title: 'Eliminar ' + row.name, body: '¿Está seguro de que desea eliminar el usuario?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(row._id).subscribe(() => {
          this.getAllUsers();
        });
      }
    });
  }

  editUser(row: User): void {
    this.router.navigate(['/users/edit/' + row._id])
  }

  deleteDoctors(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { title: 'Eliminar todos los médicos', body: '¿Está seguro de que desea eliminar todos los médicos?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let doctors: string[] = []
        this.professionals.forEach((professional, index) => {
          if (professional.hasOwnProperty('professionalType') && professional.professionalType === 'Médico') {
            doctors.push(professional._id)
          }
        })
        this.userService.deleteUsers(doctors).then(() => this.getAllUsers())
      }
    });
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTab = tabChangeEvent.index
  }
}
