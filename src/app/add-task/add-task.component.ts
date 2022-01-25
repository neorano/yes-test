
import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Task } from 'src/common/task';
import { Technician } from 'src/common/technician';
import { TaskService } from '../task.service';



@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})



export class AddTaskComponent implements OnInit {
  workingHours:Time[] = [
    {hours:8,minutes:0},
    {hours:17,minutes:0}
  ]
  dateFormControl = new FormControl(new Date());
  selectedTechnician!:Technician;
  duration!:Time;
  technicians: Technician[] =[]  ;
  description:String='';
  taskForm = this.fb.group({
    tech: ['', Validators.required],
    duration: ['', Validators.required],
    description: ['', Validators.required],
   });
  
  durations:Time [] = [
    {hours:1,minutes:0},
    {hours:2,minutes:0},
    {hours:3,minutes:0},
    {hours:4,minutes:0},
    {hours:5,minutes:0},
    {hours:6,minutes:0},
    {hours:7,minutes:0},
    {hours:8,minutes:0},


  ]

  times: Time[] = [
    {hours:7,minutes:0},
    {hours:8,minutes:0},
    {hours:9,minutes:0},
    {hours:10,minutes:0},
    {hours:11,minutes:0},
    {hours:12,minutes:0},
    {hours:13,minutes:0},
    {hours:14,minutes:0},
    {hours:15,minutes:0},
    {hours:16,minutes:0},

  ];
  selectedTime:Time= this.times[0];
  begin:Date=new Date();
  end!:Date;

 
 

  constructor(private fb: FormBuilder, private taskService:TaskService) { }

  ngOnInit(): void {
    // this.technicians.push(new Technician());
    // this.technicians.push(new Technician("Maxim Ivanov"));
    // this.technicians.push(new Technician());
   
    this.renewTechnicians();
  
  }

  daysFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
   
    return day !== 5 && day !== 6;
  };

  addTask(){

    this.setDates();

      // this.selectedTechnician.tasks.push(new Task (new Date (this.begin),new Date (this.end),this.description));
     let newTask = new Task (new Date (this.begin),new Date (this.end),this.description)
      this.taskService.add(newTask,this.selectedTechnician.id).subscribe(data=> {
        this.renewTechnicians();
        alert("Task added succesfully!");
      }, err => {
        alert ("Selected Technician is busy")
      }
      )
     
      
      console.log (this.technicians);

    

    
  }
  get f() { return this.taskForm.controls; }

  setDates (){
    this.begin.setMinutes(this.selectedTime.minutes);
    this.begin.setHours(this.selectedTime.hours);

    this.end = new Date(this.begin);
   
    if (this.selectedTime.hours+this.duration.hours>this.workingHours[1].hours){
      //if my task is going to end in another day
      this.end.setDate(this.end.getDate() + 1);
      this.end.setHours (this.selectedTime.hours+this.duration.hours-this.workingHours[1].hours+this.workingHours[0].hours)

    }
    else {
      this.end.setHours (this.selectedTime.hours+this.duration.hours);
    }
  }

  renewTechnicians (){
    this.taskService.findAll().subscribe(data => {
      this.technicians = data;
      console.log (this.technicians);
    });
  }


  isTechnicianFree (begin:Date,end:Date,technician:Technician){

    if (!technician.tasks){
      technician.tasks=[];
      return true;
    }

   for (let index = 0; index < technician.tasks.length; index++) {
     const task = technician.tasks[index];

      if ((begin>=task.begin)&&(begin<task.end)){
        return false;// task begin inside another task
      }
      if ((end>task.begin)&&(end<=task.end)){
        return false;// task end inside another task
      }
      if ((task.begin>=begin)&&(task.begin<end)){
        return false;// another task begin inside new task
      }
      if ((task.end>begin)&&(task.end<=end)){
        return false;// another task end inside new task
      }

    }
    
    return true;
  }

}
