import { provideClientHydration } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  message: string = '';

  constructor() { }

  add(message:string) {
    this.message = message

    //Vai mostrar a mensagem depois sumir após 40seg
    setTimeout(() => {
      this.clear();
    },4000);
  }
    clear(){
    this.message = '';

  }

}
