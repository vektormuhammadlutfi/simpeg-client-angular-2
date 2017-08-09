import { Component, OnInit , OnChanges, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlamatProvinsiService } from '../../_service/alamat-provinsi.service';
import {MainServiceService} from '../../_service/main-service.service'

import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-alamat-provinsi',
  templateUrl: './alamat-provinsi.component.html',
  styleUrls: ['./alamat-provinsi.component.css']
})
export class AlamatProvinsiComponent implements OnInit {

  @ViewChild('popup1') popup1: Popup;

  msg : string;
  img : string;

  ismenu:any;
  listItem :any;
  listOne : any;
  id:any;
  credential :any;
  idHapus:any;
  //variable edit
  editItem : string;

  //variable create new
  newItem : string;

  constructor(
  		private myservice : AlamatProvinsiService, 
  		private router : Router,
  		private activeRoute : ActivatedRoute,
      private main_s : MainServiceService
  	) { 
  }

  ngOnInit() {
  	this.getAll()
    console.log("loaded")
    this.whois()
  }

  whois(){
      this.main_s.whois()
      .subscribe(
        (data) => {
           this.mymenu(data)
        }
      )
  }

  mymenu(param){
    this.main_s.getmymenu(param)
      .subscribe(
        (data) => {
           console.log(data.data)
           this.ismenu = data.data
        }
      )
  }

  getByOne(param){
    this.myservice.getByOne(param)
    .subscribe(
      (data) => {
         this.listOne = data.data;
         console.log(this.listOne)
      }
    )
  }

  getAll(){
  	this.myservice.getAll()
  	.subscribe(
		  (data) => {
  			if (data) {
  				this.listItem = data.data
  			}else{
  				this.listItem = "data kosong"
  			}
  	  },
  		(Error) => console.log(Error)
	  )
  }

  createNew(){
    this.credential = {provinsi : this.newItem};
    this.myservice.save(this.credential)
    .subscribe(
      (data) => {
          this.ngOnInit()
           if (data.success == true) {
           this.msg = "data baru telah ditambahkan"
          }else{
           this.msg = "data telah ada"

          }
          this.img = "/assets/img/icon/006-mountain.png"
          this.show_notif("#7cb82f");
      }
    )
  }

  updateById(param){
    this.credential = {provinsi : this.editItem};
    this.myservice.edit(this.credential, param)
    .subscribe(
      (data) => {
          this.ngOnInit()
          this.msg = "data telah berhasil di ubah"
          this.img = "/assets/img/icon/001-round.png"
          this.show_notif("#0077b5");

      }
    )
  }

  deteleById(param){
    this.myservice.delete(param)
    .subscribe(
      (data) => {
          console.log(data)
          this.ngOnInit()
           this.msg = "data telah berhasil dihapus"
          this.img = "/assets/img/icon/004-danger.png"
          this.show_notif("#c70039");
      }
    )
  }

  hapus(data){
    this.idHapus=data;
  }

  show_notif(warna){
    this.popup1.options = {
      header: "master agama",
      color: warna, // red, blue.... 
      widthProsentage: 40, // The with of the popou measured by browser width 
      animationDuration: 1, // in seconds, 0 = no animation 
      showButtons: true, // You can hide this in case you want to use custom buttons 
      cancleBtnContent: "OK", // the text on your cancel button 
      // confirmBtnClass: "btn btn-default", // your class for styling the confirm button 
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
      animation: "bounceIn" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };
   
    this.popup1.show(this.popup1.options);
    
  }


}
