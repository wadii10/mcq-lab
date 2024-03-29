import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { DoctorService } from '../../services/doctor.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit{
  subjects: any[] = [];
  nbMmembers :any;
  chartData1: ChartDataset[] = [];
  chartLabels1: string[] = [];
  chartOptions1: ChartOptions = {
    responsive: true,
  };

  constructor(private doctorService: DoctorService ,private As: AuthService) { 
    this.nbMmembers = this.As.getUsers('students').subscribe((res:any)=>{
      this.nbMmembers=res.length});

  }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(): void {
    this.doctorService.getAllsubjects().subscribe((res: any) => {
      this.subjects = res;
      this.prepareChartData();
    });
  }
  

  prepareChartData(): void {
    // Assuming questions is an array in each subject object
    this.chartData1 = [
      {
        label: 'Number Of Question',
        data: this.subjects.map(subject => subject.questions.length)
      }
    ];

    this.chartLabels1 = this.subjects.map(subject => subject.name);
  }

}