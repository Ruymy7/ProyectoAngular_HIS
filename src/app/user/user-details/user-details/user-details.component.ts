import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Professional } from 'src/app/models/professional.model';
import { Patient } from 'src/app/models/patient.model';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { DialogComponent } from 'src/app/dialog/dialog/dialog.component';

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

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.userService.getUser(params.id)
          .subscribe(user => {
            if(user.hasOwnProperty('NHC')) this.userType = type.patient
            else this.userType = type.professional
            this.user = user
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
        this.userService.deleteUser(row.id).subscribe(() => {
          this.router.navigate(['/'])
        });
      }
    });
  }

  editUser(row: User): void {
    this.router.navigate(['/users/edit/' + row.id])
  }

}
