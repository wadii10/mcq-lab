import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit{

  constructor(private DS:DoctorService, private AS:AuthService, private toaster:ToastrService) {}

  subjects:any[] = [];
  user:any={};

  ngOnInit(): void {
    this.getSubjects()
   this.getUserInfo()
  }

  getSubjects(){
    this.DS.getAllsubjects().subscribe((res:any)=>{
      this.subjects=res
    })
  }

  getUserInfo(){
    this.AS.getRole().subscribe(res=>{
      this.user = res
    })
  }

  delete(index:number){
    let id = this.subjects[index].id
    this.subjects.splice(index, 1)
    this.DS.deleteSubject(id).subscribe(res=>{
      this.toaster.success("subject deleted succefully");
    })
  }
}
