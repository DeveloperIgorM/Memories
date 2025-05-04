import { Component, OnInit } from '@angular/core';
import { MomentService } from '../../../services/moment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Moment } from '../../../Moment';
import { environment } from '../../../../environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})
export class MomentComponent {  
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl

  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private momentService: MomentService, 
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {

  const id = Number(this.route.snapshot.paramMap.get('id'));

  this.momentService
    .getMoment(id)
    .subscribe((item) => (this.moment = item.data));
  }

  async removeHandler(id: number) {
   await this.momentService.removeMoment(id). subscribe() //Método assíncro que espera essa ação acontecer para executar à próxima

   this.messagesService.add('Momento excluído com sucesso!');

   this.router.navigate(['/']); // Manda pra home, depois da exclusão

  }
}
