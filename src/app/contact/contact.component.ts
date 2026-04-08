import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface ContactItem {
  label: string;
  value: string;
  href: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  name: string = '';
  message: string = '';

  readonly contactItems: ContactItem[] = [
    {
      label: 'Phone',
      value: '+91 9605860533',
      href: 'https://wa.link/0yztgp'
    },
    {
      label: 'Email',
      value: 'rohithrjnr43@gmail.com',
      href: 'mailto:rohithrjnr43@gmail.com'
    },
    {
      label: 'Instagram',
      value: '_.so_u_l_',
      href: 'https://instagram.com/_.so_u_l_'
    }
  ];

  onSubmit(form: NgForm): void {
    const name = String(form.value['name'] ?? '').trim();
    const message = String(form.value['message'] ?? '').trim();

    if (!name || !message) {
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:rohithrjnr43@gmail.com?subject=${subject}&body=${body}`;
    form.resetForm();
  }
}
