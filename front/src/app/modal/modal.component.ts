import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  form: FormGroup;
  description:string;
  name: string;
  nick: string;
  link: string;
  image: string;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<ModalComponent>,
      @Inject(MAT_DIALOG_DATA) data) {
        console.log(data);

      this.name = data.name;
      this.nick = data.profile_name;
      this.link = data.link;
      this.image = data.profile_image;

      this.description = data.description;
  }

  ngOnInit() {
      this.form = this.fb.group({
          description: [this.description, []]
      });
  }

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
}
