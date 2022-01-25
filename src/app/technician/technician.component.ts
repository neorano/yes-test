import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/common/task';
import { Technician } from 'src/common/technician';

@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.css']
})
export class TechnicianComponent implements OnInit {
  @Input() tech!:Technician;


  constructor() { }

  ngOnInit(): void {
 
  }

  ngDoCheck() {
    if (!this.tech) return;
    if (!this.tech.tasks) return;
    this.tech.tasks.sort(function(a,b){
      return new Date (a.begin).valueOf() - new Date (b.begin).valueOf();
    });
  }
  

  checkSameDay(task:Task){
    return (new Date (task.begin).getDate()===new Date (task.end).getDate())
  }

}
