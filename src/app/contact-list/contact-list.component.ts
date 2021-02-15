import { Component, NgZone, OnInit, OnChanges } from '@angular/core';
import { ContactInfoService } from '../contact-info.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnChanges {
  public contactList = [];
  public showDetails: boolean = true;
  public deleteIndex: any;
  public editIndex: any;
  public isEdit: boolean = false;
  editForm: FormGroup;
  public previousfirstname: any;
  public previouslastname: any;
  public previousphone: any;
  public previousemail: any;
  public previoustatus: any;

  constructor(
    private ContactInfoService: ContactInfoService,
    private toastyService: ToastyService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.contactList = this.ContactInfoService.getContactlist();
    if (this.contactList.length < 1) {
      this.showDetails = false;
    }
  }
  ngOnChanges() {
    console.log('change');
  }
  edit(index) {
    console.log('edit');
    this.editIndex = index;
    let currentValues = this.ContactInfoService.getContactValues(index);
    console.log(currentValues);
    this.previousfirstname = currentValues.firstname;
    this.previouslastname = currentValues.lastname;
    this.previousemail = currentValues.email;
    this.previousphone = currentValues.phone;
    this.previoustatus = currentValues.status;

    this.editForm = new FormGroup({
      firstname: new FormControl(this.previousfirstname, Validators.required),
      lastname: new FormControl(this.previouslastname, Validators.required),
      email: new FormControl(this.previousemail, [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(this.previousphone, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      status: new FormControl(this.previoustatus, Validators.required),
    });
    console.log(this.editForm.value);
    document.getElementById('edit-form').style.display = 'block';
  }
  confirmDelete(index) {
    document.getElementById('delete-confirm').style.display = 'block';
    this.deleteIndex = index;
  }
  delete() {
    this.ContactInfoService.delete(this.deleteIndex);
    this.toastyService.success({
      title: 'Successfully deleted contact details.',
      showClose: false,
      timeout: 5000,
      theme: 'default',
    });
    document.getElementById('delete-confirm').style.display = 'none';
  }
  deleteClose() {
    document.getElementById('delete-confirm').style.display = 'none';
  }

  editContact(value) {
    console.log(value);
    this.ContactInfoService.editContactsInfo(value);
    this.contactList = this.ContactInfoService.getContactlist();
    document.getElementById('edit-form').style.display = 'none';
    this.contactList[this.editIndex] = value;
    this.toastyService.success({
      title: 'Successfully edited contact details.',
      showClose: false,
      timeout: 5000,
      theme: 'default',
    });
  }
}
