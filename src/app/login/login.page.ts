import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private fingerprintAIO: FingerprintAIO,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  login() {
    this.fingerprintAIO.show({
      description: 'Biometrics login',
    }).then(() => {
      this.router.navigateByUrl('/home');
    });
  }

}
