import { Component, OnInit, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage';
import { NotificationService } from '@app/Services';

import {Observable, Subject, lastValueFrom} from 'rxjs';

import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  @Input() file !: File;
  @Output() completed = new EventEmitter<string>();

  task !: AngularFireUploadTask;

  snapshot$ !: Observable<UploadTaskSnapshot | undefined>;

  percentage$ !: Observable<number | undefined>;

  downloadURL !: string;

  uploadError !: string;

  private destroy = new Subject<void>();

  constructor(
    private storage: AngularFireStorage,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.startUpload();
  }

  startUpload(): void {
      const path = `${this.file.type.split('/')[0]}/${Date.now()}_${this.file.name}`;

      const storageRef = this.storage.ref(path);

      this.task = this.storage.upload(path, this.file);

      this.percentage$ = this.task.percentageChanges();

      this.snapshot$ = this.task.snapshotChanges() as Observable<UploadTaskSnapshot | undefined>

      this.snapshot$.pipe(
        takeUntil(this.destroy)
      ).subscribe({
        error: (err) => {
          this.uploadError = err?.message || 'Error subiendo el archivo';
          this.notification.error(`Error subiendo ${this.file.name}: ${this.uploadError}`);
        },
        complete: async () => {
          const storageRefObservable$ = storageRef.getDownloadURL();
          this.downloadURL = await lastValueFrom(storageRefObservable$);
          this.completed.next(this.downloadURL);
        }
      });

  }

  ngOnDestroy() : void {
    this.destroy.next();
    this.destroy.complete()
  }



}
