import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { captureError } from 'rxjs/internal/util/errorContext';


@Component({
  selector: 'app-keyboard-control',
  standalone: true,
  imports: [NgFor],
  templateUrl: './keyboard-control.component.html',
  styleUrl: './keyboard-control.component.scss'
})
export class KeyboardControlComponent {
  indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  letters = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'];

  capitalLetters: string[] = [];

  ngOnInit() {
    this.capitalLetters = this.letters.map(el => el.toUpperCase());

    this.logMe();
  }

  logMe() {
    console.log(this.letters);
  }
}
