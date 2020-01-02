import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-idle-screen',
  templateUrl: './idle-screen.component.html',
  styleUrls: ['./idle-screen.component.scss'],
})
export class IdleScreenComponent implements OnInit {
  currentTime = new Date();

  ngOnInit() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }
}
