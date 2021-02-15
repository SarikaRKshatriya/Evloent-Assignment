import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ContactInfoService } from '../contact-info.service';
import { ToastyService } from 'ng2-toasty';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  addForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[1-9]+[0-9]*$/),
    ]),
    status: new FormControl('', Validators.required),
  });
  @ViewChild('addForm') form: FormGroup;
  constructor(
    private ContactInfoService: ContactInfoService,
    private toastyService: ToastyService
  ) {}

  ngOnInit(): void {}

  showForm() {
    this.addForm.reset();
    document.getElementById('add-form').style.display = 'block';
  }
  addContact(form) {
    this.ContactInfoService.addContactInfo(form.value);
    console.log(form.value.firstname);
    this.form.reset();
    document.getElementById('add-form').style.display = 'none';
    this.toastyService.success({
      title: 'Successfully added contact details.',
      showClose: false,
      timeout: 5000,
      theme: 'default',
    });
  }
}
