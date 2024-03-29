import { Subject } from "./subject";

export interface Student {
    username: string;
    email: string;
    password: string;
    subjects: Subject[];
    id: string;
}