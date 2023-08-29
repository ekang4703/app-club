import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  formData = {
    name: '',
    email: '',
    president: '',
    vicepresident: '',
    secretary: '',
    treasurer: '',
    missionstatement: '',
    teacheradvisor: '',
    meetinginfo: '',
    clubPicture: ''
  };

  private supabaseUrl = "https://ywnwejgjvmthpwohyjer.supabase.co";
  private supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3bndlamdqdm10aHB3b2h5amVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY0Mzg3OTUsImV4cCI6MTk5MjAxNDc5NX0.RY5l6fP6pKmhYtyD1Ms8fVR52HczAjOcAdGrvXeV-J8";
  private supabaseClient = createClient(this.supabaseUrl, this.supabaseKey);

  isEmailValid = false;

  constructor(
    public alertcontroller: AlertController,
    private data: DataService
  ) {}

  ngOnInit() {}

  selectedFiles: File[] = [];


  handleFileInput(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files.length > 0) {
    this.selectedFiles.push(...Array.from(inputElement.files));
    console.log('Selected files:', this.selectedFiles);
    
  }
}

validateEmail(){
  const validEmailPattern = /^990.*@my\.hartdistrict\.org$/;
  this.isEmailValid = validEmailPattern.test(this.formData.email);

}

async submitData() {
  try {
    this.validateEmail();
    
    if(!this.isEmailValid){
      const alert = await this.alertcontroller.create({
        header: 'Invalid Email',
        message: 'Enter valid email idiot sandwich monkey smooth brain".',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    

    const insertData = this.selectedFiles.map(async (file) => {
      const { data: uploadedFile, error: uploadError } = await this.supabaseClient
        .storage.from('images')
        .upload(`clubPictures/${file.name}`, file);
      
      if (uploadError) {
        console.error(uploadError);
        return null;
      }
      
      return {
        name: this.formData.name,
        email: this.formData.email,
        president: this.formData.president,
        vicepresident: this.formData.vicepresident,
        secretary: this.formData.secretary,
        treasurer: this.formData.treasurer,
        teacheradvisor: this.formData.teacheradvisor,
        missionstatement: this.formData.missionstatement,
        meetinginfo: this.formData.meetinginfo,
        clubPicture: uploadedFile?.path || null,
      };
    });

    const insertResults = await Promise.all(insertData);

    const { data, error: insertError } = await this.supabaseClient
      .from('form_information')
      .insert(insertResults.filter(result => result !== null));

    if (insertError) {
      console.error(insertError);
      return;
    }

    // Clear the selectedFiles array and reload the page after successful submission
    this.selectedFiles = [];
    location.reload();

    console.log('Form submitted successfully');
  } catch (error) {
    console.error(error);
  }
}

  async showConfirmation() {
    const confirm = await this.alertcontroller.create({
      header: 'Wait!',
      message: 'Are you sure you want to submit your form?',
      buttons: [
        {
          text: 'Back',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Submit',
          handler: () => {
            this.submitData();
          }
        }
      ]
    });
    await confirm.present();
  }
}
