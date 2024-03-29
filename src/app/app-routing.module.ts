import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SubjectsComponent } from './teacher/components/subjects/subjects.component';
import { NewExamComponent } from './teacher/components/new-exam/new-exam.component';
import { StudentsComponent } from './teacher/components/students/students.component';
import { ExamComponent } from './student/exam/exam.component';
import { StatisticsComponent } from './teacher/components/statistics/statistics.component';

const routes: Routes = [
  {path:'statistics', pathMatch:'full',component:StatisticsComponent},
  {path:'exam/:id' , pathMatch:'full', component:ExamComponent},
  {path: 'students', pathMatch:'full', component:StudentsComponent},
  {path:'newExam', pathMatch:'full', component:NewExamComponent},
  {path:'subjects', pathMatch:'full', component:SubjectsComponent},
  {path:'login', pathMatch:'full', component:LoginComponent},
  {path:'register', pathMatch:'full', component:RegisterComponent},
  {path:'', pathMatch:'full', component:RegisterComponent},
  {path:'**', pathMatch:'full', redirectTo:'register'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
