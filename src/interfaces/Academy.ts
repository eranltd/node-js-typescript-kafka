import {Project} from './Project'

export interface Rule{
    id : string, //guid
    name : string,
    ID:string; 
    projects : Project[], 
    createdAt : string,
    updatedAt : string,
    deleted : boolean
}

