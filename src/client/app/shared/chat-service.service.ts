import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatServiceService {

  private url = 'http://localhost:3000';
  private socket;

    
  constructor() { 
    this.socket = io(this.url);
  }

}
