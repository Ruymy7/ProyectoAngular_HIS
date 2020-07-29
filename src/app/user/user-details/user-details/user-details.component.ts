import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Professional } from 'src/app/models/professional.model';
import { Patient } from 'src/app/models/patient.model';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { DialogComponent } from 'src/app/dialog/dialog/dialog.component';
import { StorageService } from 'src/app/auth/storage.service';

enum type {
  patient,
  professional
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: Patient | Professional
  userType: type

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private storageService: StorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.userService.getUser(params.id)
          .subscribe(user => {
            if(user.hasOwnProperty('NHC')) this.userType = type.patient
            else this.userType = type.professional
            this.user = user
          }, error => {
            if(error.status === 401) {
              this.storageService.logout()
            }
          });
      }
    });
  }

  deleteUser(row: User): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { title: 'Eliminar ' + row.name, body: '¿Está seguro de que desea eliminar el usuario?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(row._id).subscribe(() => {
          this.router.navigate(['/'])
        }, error => {
          if(error.status === 401) {
            this.storageService.logout()
          }
        });
      }
    });
  }

  editUser(row: User): void {
    this.router.navigate(['/users/edit/' + row._id])
  }

}
