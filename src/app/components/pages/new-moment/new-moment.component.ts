import { MessagesService } from './../../../services/messages.service';
import { MomentService } from './../../../services/moment.service';
import { Component, OnInit } from '@angular/core';
import { Moment } from '../../../Moment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css'
})
export class NewMomentComponent implements OnInit{
  btnText = 'Compartilhar!';


  //iniciando no componente
  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router
    ) {}

  ngOnInit(): void {}
    
    async createHandler(moment: Moment) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);
    
    if (moment.image) {
      formData.append('image', moment.image);
    }

// todo

  await this.momentService.createMoment(formData).subscribe();

    this.messagesService.add('Momento adicionado com Sucesso!');


    //metodo navigate -> pode levar o usuário a uma Url especifica
    this.router.navigate(['/']); // levando o usuário para Home
  }
}