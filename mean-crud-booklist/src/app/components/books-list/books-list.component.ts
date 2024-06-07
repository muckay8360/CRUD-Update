import { Component, OnInit, NgZone } from '@angular/core';
import { CrudService } from './../../service/crud.service';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms"


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  Books:any = [];  
  EditForm: boolean = false;
  bookchanges: any = {};
  
  constructor(private crudService: CrudService, public fb: FormBuilder) {}
 
 
  ngOnInit(): void {
    this.crudService.GetBooks().subscribe(res => {
      this.Books =res;
    }); 
    
     
  }

  getBooks() {
    this.crudService.GetBooks().subscribe(res => {
      this.Books =res;
    }); 
  }
  onDelete(id: any): any {
    this.crudService.DeleteBook(id)
    .subscribe(res => {
    console.log(res)
  })
  location.reload();
  } 
  onUpdate(): void {
   
    const { isbn, title, author, description, published_year, publisher} = this.bookchanges;
    const updatedBook = { isbn, title, author, description, published_year, publisher };
    this.crudService.UpdateBook(this.bookchanges._id, updatedBook).subscribe(res => {
      this.EditForm = false;
      this.ngOnInit();
    });
   
     
  }
  onUpdateBook(book: any): void {
    this.EditForm = true;
    this.bookchanges = { ...book };
  }


}

