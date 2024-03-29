import { Question } from "./question";
import { Subject } from "./subject";

export interface SubjectWithQuestions extends Subject {
    questions: Question[];
}