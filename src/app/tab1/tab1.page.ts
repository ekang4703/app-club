import { Component, OnInit } from '@angular/core';
import { ROUTES, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { createClient } from '@supabase/supabase-js';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  formData = {
    questionsconcerns: '',
    email: '',
    name: '',
  };

  private supabaseUrl = "https://ywnwejgjvmthpwohyjer.supabase.co";
  private supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3bndlamdqdm10aHB3b2h5amVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY0Mzg3OTUsImV4cCI6MTk5MjAxNDc5NX0.RY5l6fP6pKmhYtyD1Ms8fVR52HczAjOcAdGrvXeV-J8";
  private supabaseClient = createClient(this.supabaseUrl, this.supabaseKey);

  constructor(
     
    private data: DataService,
    private alertController: AlertController,
    private navController: LoadingController,
    private router: Router
  ) {}
  ngOnInit() {
    
  }

  async dataSubmit() {
    try {
      const { data, error } = await this.supabaseClient
        .from('Questions_Concerns')
        .insert([{ 
          questionsconcerns: this.formData.questionsconcerns,
          email: this.formData.email,
          name: this.formData.name,
        }]);

      if (error) {
        console.error(error);
        return;
      }

      const alert = await this.alertController.create({
        header: 'Success!',
        message: 'Your form has been submitted.',
        buttons: ['OK'],
      });

      await alert.present();
    } catch (error) {
      console.error(error);
    }
  }

  async showConformation() {  
    const confirm = await this.alertController.create({  
      header: 'Wait!',  
      message: 'Are you sure you want to submit this form?',  
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
            this.dataSubmit();  
          }  
        }  
      ]  
    });  
    await confirm.present();  
  }  

  swiperSlideChanged(e: any) {
    console.log('chnaged: ', e);
  }
  

}