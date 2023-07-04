import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmailPepople } from 'src/app/interfaces/email-people';
import { BrevoService } from 'src/app/services/brevo/brevo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  formContact: FormGroup;
  constructor(
    private fBuilder: FormBuilder,
    private brevoService: BrevoService,
    private toastr: ToastrService
  ) {
    this.buildForm();
  }

  private buildForm(): void {
    this.formContact = this.fBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      subject: ['', Validators.required],
      message: [''],
    });
  }

  get fullName() {
    return this.formContact.get('fullName');
  }

  get email() {
    return this.formContact.get('email');
  }

  get phoneNumber() {
    return this.formContact.get('phoneNumber');
  }

  get subject() {
    return this.formContact.get('subject');
  }

  get message() {
    return this.formContact.get('message');
  }

  ngOnInit(): void {}

  sendEmail(): void {
    if (this.formContact.invalid) {
      this.formContact.markAllAsTouched();
      return;
    }
    const formData = this.formContact.getRawValue();
    this.brevoService
      .sendEmail(
        this.buildSender(formData),
        this.buildTo(),
        formData.subject,
        this.buildHtml(formData)
      )
      .subscribe(
        (resp) => {
          this.toastr.success('Correo enviado de manera exitosa');
          this.formContact.reset();
        },
        (error) =>
          this.toastr.error(
            'Ocurrió un error al enviar el correo, intente nuevamente'
          )
      );
  }

  private buildSender(formData: any): EmailPepople {
    return { email: formData.email, name: formData.fullName };
  }

  private buildTo(): Array<EmailPepople> {
    return [
      {
        email: 'lfernando1120@gmail.com',
        name: 'Luis Fernando Prudencio Cruz',
      },
    ];
  }

  private buildHtml(formData: any): string {
    return `<h1>${formData.subject}</h1>
      <h2 >Hola mi nombre es <span style="color: #5e9ca0;">${formData.fullName}</span></h2>
      <p>${formData.message}</p>
      <p><strong>&nbsp;</strong></p>
      <p><strong>Mi número de telefono es ${formData.phoneNumber}</strong></p>`;
  }
}
