import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { MomentService } from '../../../services/moment.service';
import { MessagesService } from '../../../services/messages.service';
import { CommentService } from '../../../services/comment.service';


import { Moment } from '../../../Moment';
import { Comment } from '../../../Comment';

import { environment } from '../../../../environments/environment';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

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

  commentForm!: FormGroup;


  constructor(
    private momentService: MomentService, 
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {

  const id = Number(this.route.snapshot.paramMap.get('id'));

  this.momentService
    .getMoment(id)
    .subscribe((item) => (this.moment = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number) {
   await this.momentService.removeMoment(id). subscribe() //Método assíncro que espera essa ação acontecer para executar à próxima

   this.messagesService.add('Momento excluído com sucesso!');

   this.router.navigate(['/']); // Manda pra home, depois da exclusão

  }

  async onSubmit(FormDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return 
    } // verificação para se caso, acontecer um envio com os campos vazios  

    const data: Comment = this.commentForm.value // tipando data como "Comment"
    //value para colocar mais dados a esse formulário

    data.momentId = Number(this.moment!.id)

    await this.commentService
    .createComment(data)
    .subscribe((comment) => this.moment!.comments!.push(comment.data));

    this.messagesService.add('Comentário adicionado!');

    // reseta o form
    this.commentForm.reset();

    FormDirective.reset();

  }
}
