import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  control= null;
  singupForm: FormGroup;
  forbiddenUsernames= ['Chris', 'Anna']

  ngOnInit() {
    this.singupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]), 
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })
    // this.singupForm.valueChanges.subscribe(
    //   (value)=> console.log(value)
    // )
    this.singupForm.statusChanges.subscribe(
      (status)=> console.log(status)
    )
  }

  onSubmit(){
    console.log(this.singupForm.value)
  }

  onAddHobby(){
    this.control= new FormControl(null, Validators.required);
   (<FormArray>this.singupForm.get('hobbies')).push(this.control);
  }

  getControls() {
    return (<FormArray>this.singupForm.get('hobbies')).controls;
  }

//validation on Array
 forbiddenNames(control: FormControl): {[s: string]: boolean} {
   if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
     return {'nameIsForbidden': true};
   }
   return null
 }

 //Asynchronic validation
 forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
   const promise= new Promise((resolve, reject) => {
     setTimeout(()=> {
       if (control.value === 'test@test.com') {
         resolve({'emailIsForbidden': true})
       } else {
         resolve(null)
       }
     },1500)
   })
   return promise
 }

}
