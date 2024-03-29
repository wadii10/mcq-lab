import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss'],
})
export class NewExamComponent implements OnInit {
  subName = new FormControl('');
  subjectName: any = '';
  questionForm!: FormGroup;
  correctAns: any;
  questions: any[] = [];
  startAdd: boolean = false; //show subject name
  preview: boolean = false; 
  stepperIndex: number = 0;
  id: any;

  constructor(
    private DS: DoctorService,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.questionsForm();
  }

  start() {
    if (this.subName.value == '') {
      this.toaster.error('please enter the subject name');
    } else {
      this.startAdd = true;
      this.subjectName = this.subName.value;
    }
    if (this.startAdd) {
      this.stepperIndex = 1;
    }
  }

  questionsForm() {
    this.questionForm = this.fb.group({
      question: ['', [Validators.required]],
      answer1: ['', [Validators.required]],
      answer2: ['', [Validators.required]],
      answer3: ['', [Validators.required]],
      answer4: ['', [Validators.required]],
      correctAnswer: [''],
    });
  }

  createQuestion() {
    if (this.correctAns) {
      const model = {
        question: this.questionForm.value.question,
        answer1: this.questionForm.value.answer1,
        answer2: this.questionForm.value.answer2,
        answer3: this.questionForm.value.answer3,
        answer4: this.questionForm.value.answer4,
        correctAnswer: this.questionForm.value[this.correctAns],
      };
      this.questions.push(model);
      this.questionForm.reset();
    } else {
      this.toaster.error('choose your right answer');
    }
    console.log(this.questions);
  }

  getCorrect(event: any) {
    this.correctAns = event.value;
  }

  submit() {
    const model = {
      name: this.subjectName,
      questions: this.questions,
    };
    if (this.preview) {
      this.stepperIndex = 2;
    } else {
      this.DS.createSubject(model).subscribe( (res: any) => {
        this.preview = true;
        this.id = res.id;
      });
    }
  }

  clearForm() {
    this.questionForm.reset();
  }

  cancelForm() {
    this.questionForm.reset();
    this.questions = [];
    this.subjectName = '';
    this.subName.reset();
    this.stepperIndex = 0;
    this.startAdd = false;
  }

  delete(index:any){
    this.questions.splice(index, 1);
    const model = {
      name:this.subjectName,
      questions:this.questions
    }
    this.DS.updateSubject(model, this.id).subscribe( res =>{
      this.toaster.success("question deleted");
    })
  }

}
