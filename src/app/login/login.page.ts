import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isAvailable: Promise<boolean>;

  constructor(
    private fingerprintAIO: FingerprintAIO,
    private router: Router,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
  }

  async login() {
    this.fingerprintAIO.isAvailable()
    .then(() => this.isAvailableSuccess())
    .catch((error)=> this.isAvailableError(error));
    console.log('in');
  }

  isAvailableSuccess() {
    this.fingerprintAIO.show({
      title: 'Biometric Authentication',
      cancelButtonTitle: 'Use Pin or Pattern',
      disableBackup: false,
      fallbackButtonTitle: 'FB Back Button',
      subtitle: 'Login using biometrics',
      description: 'Biometrics login',
    }).then((something) => {
      this.router.navigateByUrl('/home');
    });
  }

  async isAvailableError(error) {
    await this.presentAlert(error);

  }

  async presentAlert(error) {
    const alert = await this.alertController.create({
      header: 'Authentication not found',
      subHeader: 'Subtitle',
      message: error,
      buttons: ['OK']
    });

    await alert.present();
  }

}
