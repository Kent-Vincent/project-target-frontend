import { Component } from '@angular/core';
import { PublicService } from './commons/services/public.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-target';
  msg: any;

  constructor(private pService: PublicService){

  }
  ngOnInit(): void{
    this.showMessage();
  }

  showMessage(){
    this.pService.getMessage().subscribe(data=>{
      this.msg = data,
        console.log(this.msg);
    });
  }
}
