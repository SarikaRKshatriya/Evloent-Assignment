import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactInfoService {
  public contactList = [
    {
      firstname: 'Sarika',
      lastname: 'Kshatriya',
      email: 'sarika.k@gmail.com',
      phone: '1234567890',
      status: '1',
    },
    {
      firstname: 'Sar',
      lastname: 'KSH',
      email: 'sar.k@gmail.com',
      phone: '1111111111',
      status: '1',
    },
  ];
  constructor() {}

  getContactlist() {
    return this.contactList;
  }
  getContactValues(index) {
    return this.contactList[index];
  }
  addContactInfo(value) {
    this.contactList.push(value);
  }
  delete(index) {
    this.contactList.splice(index, 1);
  }
  editContactsInfo(value) {}
}
