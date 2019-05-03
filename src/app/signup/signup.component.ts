import { Component, OnInit } from '@angular/core';
import { ISignup } from 'src/Models/ISignup';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  progress: number = 0;
  uploadSuccess: boolean
  selectedImage: string = 'No image selected';
  downloadURL: string;
  model: ISignup = {
    Email: '',
    Password: '',
    FirstName: '',
    LastName: '',
    AadharNumber: '',
    Image: ''
  };
  constructor(
    private service: DataService,
    private fireDB: AngularFireStorage,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.model.Image = this.downloadURL;
    this.signUp(this.model);
  }

  signUp(signupData: ISignup) {
    this.service.SignUp(signupData).subscribe(response => {
      console.log(response);
      window.alert("Registration Successfull.");
      this.router.navigateByUrl('/login');
    }, (error) => {
      window.alert(error.error);
      console.log(error);

    });
  }

  selectAndUploadImage(event: any) {
    const file: File = event.target.files[0];
    this.uploadSuccess = false;
    if (file.type.substring(0, 5) == "image") {
      this.selectedImage = file.name;

      const metaData = { contentType: file.type };
      const storageRef: firebase.storage.Reference = firebase.storage().ref('/volunteers/' + new Date().getTime());
      const task = storageRef.put(file, metaData);


      task.on('state_changed', (snapshot) => {
        this.progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      }, (error) => {
        window.alert(error.message);
      }, () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.downloadURL = downloadURL;
          this.uploadSuccess = true;
          console.log('File available at', downloadURL);
        });
      });
      return false;
    }
    else {
      window.alert("upload only Image file")
    }
  }
}
