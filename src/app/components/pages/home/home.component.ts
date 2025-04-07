

import { Component, OnInit } from '@angular/core';
import { MomentService } from '../../../services/moment.service';
import { Moment } from '../../../Moment';
import { environment } from '../../../../environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    AllMoments: Moment[] = []
    moments: Moment[] = []
    baseApiUrl= environment.baseApiUrl //comando que permite buscar dados da API

    //TODO SEARCH


  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {

      const data = items.data

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');

      });
      this.AllMoments = data;
      this.moments = data;
    });
  }
}
