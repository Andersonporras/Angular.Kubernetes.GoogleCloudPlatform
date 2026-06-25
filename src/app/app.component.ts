import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {NotificationService} from '@app/Services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  showSpinner = false;
  title = 'client-inmueble-app';

  isAuthorized = false;

  constructor(private fs: AngularFirestore,
    private notification: NotificationService,
    private router: Router
    )
    {}

  ngOnInit(){
   this.isAuthorized = !!localStorage.getItem('token');
   this.fs.collection('test').stateChanges().subscribe
   (personas =>{console.log(personas.map(x=> x.payload.doc.data()))})
  }

  onToggleSpinner() : void {
    this.showSpinner = !this.showSpinner;
  }

  onFilesChanged(urls: string | string[]) : void {
    console.log('urls',urls);
  }

  onSuccess() : void {
    this.notification.success("The procedure was successful");
  }

  onError() : void {
    this.notification.error("The process encountered errors");
  }

  onSignOut() : void {
    localStorage.removeItem('token');
    this.isAuthorized = false;
    this.router.navigate(['/auth/login']);
  }

}
