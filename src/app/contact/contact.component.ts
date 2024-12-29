import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  name: string = '';
  review: string = '';

  onSubmit(form: NgForm) {
    const { name, review } = form.value;

    if (name && review) {
      alert(`Thank you for your review, ${name}!`);


      form.reset();
    } else {
      alert('Please fill in both fields.');
    }
  }
}
