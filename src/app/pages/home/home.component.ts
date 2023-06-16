import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  goToUrl(opc: number): void {
    switch (opc) {
      case 1:
        window.open('https://www.facebook.com/luis.pr.cruz/');
        break;
      case 2:
        window.open(
          'https://www.linkedin.com/in/luis-fernando-prudencio-cruz-29b33a174/'
        );
        break;
      case 3:
        window.open(
          'https://stackoverflow.com/users/13303074/luis-fernando-prudencio-cruz'
        );
        break;
      case 4:
        window.open('https://github.com/ISCFERNANDO');
        break;
    }
  }

  downloadCV() {
    window.open(
      'https://drive.google.com/file/d/1F8mxPm7tzaJpFRteRtawmbyqqPMqr5Wv/view?usp=sharing'
    );
  }
}
