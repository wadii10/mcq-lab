import { Component, OnInit } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})

export class StudentsComponent implements OnInit {

  dataSource: any;
  dataTable: any;
  displayedColumns: any;
  constructor(private AS: AuthService,private doctorService:DoctorService) {
    this.displayedColumns = ['position', 'name', 'subjectName', 'degree'];
  }

  ngOnInit(): void {
    this.getAllStudents();
  }

  async getAllStudents() {
    const subjects = await lastValueFrom(this.doctorService.getAllsubjects())
    this.AS.getUsers('students').subscribe((res: any) => {
      this.dataSource = res?.map((students: any) => {
        if (students.subjects) {
          return students?.subjects?.map((sub: any) => {
            return {
              name: students.username,
              subjectName: sub.name,
              degree: sub.degree,
              total:subjects?.find(subject => subject?.id === sub?.id)?.questions?.length
            };
          });
        } else {
          return [
            {
              name: students.username,
              subjectName: '-',
              degree: '-',
            },
          ];
        }
      });
      
      this.dataTable = [];
      this.dataSource.forEach((item: any) => {
        item.forEach((subItem: any) => {
          this.dataTable.push({
            name: subItem.name,
            subjectName: subItem.subjectName,
            degree: subItem.degree,
            total:subItem.total
          });
        });
      });
    });
  }
  
}
