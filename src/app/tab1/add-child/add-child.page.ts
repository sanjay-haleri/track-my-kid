import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { debounceTime, distinctUntilChanged, map, mergeMap, switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.page.html',
  styleUrls: ['./add-child.page.scss'],
})
export class AddChildPage implements OnInit {

  // addChildForm: FormGroup;

  searchUser: FormControl = new FormControl('');

   @Input('childrenList') childrenList = [];

   allChildrenList = [];

   serachSubscribe: any;
   filterSubscribe: any;

   
  constructor(public modalController: ModalController, private fb: FormBuilder, public _serv: DataService) { 
  }

  ngOnInit() {
   this.serachSubscribe =  this.searchUser.valueChanges.pipe(debounceTime(200)).subscribe((value)=> {
      if(value != '') {
        this.filteredUsers(value);
      } else {
        this.allChildrenList = [];
      }
    });
    this.filteredUsers('');
  }

  filteredUsers(searchString: string) {
  this.filterSubscribe =  this._serv.childrens.subscribe((value)=> {
      this.allChildrenList = [];
      value.forEach(child => {
        if(child.payload.doc.data().userType == 'student' && (searchString == '' ? true : (child.payload.doc.data().email.includes(searchString) || child.payload.doc.data().firstName.includes(searchString) || child.payload.doc.data().lastName.includes(searchString) || (child.payload.doc.data().firstName + ' ' + child.payload.doc.data().lastName).includes(searchString))) ) {
          let isAdded: boolean = this.childrenList.indexOf(child.payload.doc.id) != -1 ? true : false;
          let data = { id: child.payload.doc.id, ...child.payload.doc.data(), isAdded: isAdded };
          if(searchString == '') {
            if(isAdded) this.allChildrenList.push(data);
           }
          else
          this.allChildrenList.push(data);
        }
      });
    });
  }

  saveChildren() {
    let selectedChildrens = [...this.allChildrenList.filter(child=>child.isAdded==true).map(child=>child.id)];
    // console.log(selectedChildrens);
    this._serv.updateChildren(selectedChildrens).then((res) => this.dismiss());
  }

  dismiss() {
    this.serachSubscribe.unsubscribe();
    this.filterSubscribe.unsubscribe();
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
