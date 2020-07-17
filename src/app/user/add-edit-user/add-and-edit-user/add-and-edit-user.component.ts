import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { Professional } from 'src/app/models/professional.model';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';

enum type {
  patient,
  professional
}

@Component({
  selector: 'app-add-and-edit-user',
  templateUrl: './add-and-edit-user.component.html',
  styleUrls: ['./add-and-edit-user.component.scss']
})
export class AddAndEditUserComponent implements OnInit {
  user: Patient | Professional
  userType: type
  userId: number
  form: FormGroup
  insurance: any
  saved: boolean = false
  errorMsg: boolean = false
  maxDate: Date
  step = 0;

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.maxDate = new Date()
    this.route.params.subscribe(params => {
      if (params.id) {
        this.userId = params.id
        this.userService.getUser(params.id)
          .subscribe(user => {
            if (user.hasOwnProperty('NHC')) this.userType = type.patient
            else this.userType = type.professional
            this.user = user
            this.buildForm()
          });
      } else {
        this.route.queryParams.subscribe(query => {
          this.userType = parseInt(query.type) || type.patient
          this.buildForm()
        })
      }
    })
  }

  isPatient(object: any): object is Patient {
    return 'NHC' in object;
  }

  submit(): void {
    this.errorMsg = false
    this.saved = false
    let previousUrl = ""
    if (this.form.valid) {
      if (this.userId) {
        this.form.value.id = this.userId
        this.userService.editUser(this.form.value).subscribe(result => {
          previousUrl = this.router.url
          this.saved = true
          this.scrollToTop()
          setTimeout(() => {
            this.saved = false
            if(this.router.url === previousUrl) this.router.navigate([`/users/${this.userId}`]) // if the user has not changed view, navigate to user details view
          }, 2000)
        }, error => { this.errorMsg = true; this.scrollToTop() })
      }
      else this.userService.addUser(this.form.value).subscribe(result => {
        previousUrl = this.router.url
        this.saved = true
        this.scrollToTop()
        setTimeout(() => {
          this.saved = false
          if(this.router.url === previousUrl) this.router.navigate([`/users/${result.id}`]) // if the user has not changed view, navigate to user details view
        }, 2000)
      }, error => { this.errorMsg = true; this.scrollToTop() })
    } else {
      this.form.markAllAsTouched()
    }
  }

  buildForm() {
    let NHC = ''
    let insurance = []
    let medicalBoardNumber = ''
    let professionalType = ''

    const commonData = {
      name: [this.user?.name || '', [Validators.required]],
      lastName: [this.user?.lastName || '', [Validators.required]],
      secondLastName: [this.user?.lastName || ''],
      gender: [this.user?.gender || ''],
      birthdate: [this.user?.birthdate || ''],
      idNumber: [this.user?.idNumber || '', [Validators.minLength(9)]],
      address: this.fb.group({
        street: [this.user?.address?.street || ''],
        number: [this.user?.address?.number || ''],
        door: [this.user?.address?.door || ''],
        postalCode: [this.user?.address?.postalCode || ''],
        city: [this.user?.address?.city || '']
      })
    }

    if (this.user && this.isPatient(this.user)) {
      NHC = this.user.NHC
      if (this.user.insurance && this.user.insurance.length) {
        this.user.insurance.forEach(ins => {
          insurance.push(this.fb.group({ ...ins }))
        })
      }
    } else if (this.user && !this.isPatient(this.user)) {
      medicalBoardNumber = this.user.medicalBoardNumber
      professionalType = this.user.professionalType
    }

    if (this.userType === 0) {
      this.form = this.fb.group({
        ...commonData,
        NHC: [NHC],
        insurance: this.fb.array(insurance)
      }, {});
    } else {
      this.form = this.fb.group({
        ...commonData,
        medicalBoardNumber: [medicalBoardNumber],
        professionalType: [professionalType]
      }, {});
    }
  }

  addInsurance(): void {
    if (!this.userType) {
      this.insuranceList.push(this.fb.group({ cardNumber: [''], name: [''], type: ['salud'] }))
    }
  }

  deleteInsurance(insurance): void {
    this.insuranceList.removeAt(insurance)
  }

  scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  personalDataInvalid(): boolean {
    return (this.name.invalid && this.name.touched) || (this.lastName.invalid && this.lastName.touched) 
    || (this.idNumber.invalid && this.idNumber.touched) || (this.birthdate.invalid && this.birthdate.touched)
  }

  medicalInformationInvalid(): boolean {
    return (this.NHC && this.NHC.invalid && this.NHC.touched) || (this.medicalBoardNumber && this.medicalBoardNumber.invalid && this.medicalBoardNumber.touched)
  }

  get name() { return this.form.get('name') }
  get lastName() { return this.form.get('lastName') }
  get idNumber() { return this.form.get('idNumber') }
  get birthdate() { return this.form.get('birthdate') }
  get NHC() { return this.form.get('NHC') }
  get medicalBoardNumber() { return this.form.get('medicalBoardNumber') }
  get insuranceList() { return this.form.get('insurance') as FormArray }
}
