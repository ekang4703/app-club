import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ClubService } from '../services/club.service';
import { Club } from '../services/Club.Model';
import { Router } from '@angular/router';





@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})

export class Tab2Page implements OnInit {
  clubs: Club[] = [] ;


 constructor(private modalCtrl: ModalController, private clubservice: ClubService, private router: Router) { }
  async openDetails (id: Number) {
    this.router.navigate(['clubs', id]);
  }

  

  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    //autoplay: true,
  }

  filteredClubs: Club[] = [];

  

  ngOnInit() {
    this.clubs = this.clubservice.getClubs();
    this.filteredClubs = this.clubs;
  }

  filterClubs(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.filteredClubs = this.clubs.filter(club => club.name.toLowerCase().includes(query.toLowerCase()));
  }



  swiperSlideChanged(e: any) {
    console.log('chnaged: ', e);
  }
}
