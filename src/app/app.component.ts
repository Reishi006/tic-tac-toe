import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';

class Box {
  constructor(index: number, value: string, imagePath: string) {
    this.index = index;
    this.value = value;
    this.imagePath = imagePath;
  }

  index = 0;
  value = '';
  imagePath = '';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;

    if (localStorage) {
      let boxesState: string | null = localStorage?.getItem('gameState');
      if (boxesState !== null) {
        this.boxes = JSON.parse(boxesState);
        this.checkWin();
      } else {
        for (let i = 0; i < 9; i++) {
          this.boxes.push(new Box(i, '', ''));
        }
      }
    }
  }

  boxes: Box[] = [];

  player: string[] = ['x', 'o'];
  currentTurn = Math.floor(Math.random() * 2);
  result: string = '';
  resultAnimation: string = '';
  gameEnd: boolean = false;

  gameBlur: string = '';
  gameBlock: string = 'none';

  indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  letters = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'];


  @HostListener('document:keyup', ['$event'])
  onKeyUp(e:KeyboardEvent) {

    switch(e.key) {
      case 'Enter':
        if (this.gameEnd) {
          this.resetBoard();
        }
        break;
      case 'Escape' || 'r':
        this.resetBoard();
        break;
      default:
        if (!this.gameEnd) {
          if (e.key in this.indexes) {
            this.setBoxImage(Number(e.key));
            this.checkWin();
          } else if (this.letters.includes(e.key)) {
            this.setBoxImage(this.letters.indexOf(e.key));
            this.checkWin();
          }
        }
    }
  }


  ngOnInit() {
    // do something on init
  }

  setBoxImage(i: number) {
    if (this.currentTurn < 0 || this.currentTurn > 1) return;
    if (this.boxes[i].value !== '') return;

    if (this.currentTurn === 0) {
      this.boxes[i].value = this.player[this.currentTurn];
      this.boxes[i].imagePath = `${this.player[this.currentTurn]}.svg`;
      this.currentTurn = 1;
    } else if (this.currentTurn === 1) {
      this.boxes[i].value = this.player[this.currentTurn];
      this.boxes[i].imagePath = `${this.player[this.currentTurn]}.svg`;
      this.currentTurn = 0;
    }

    localStorage.setItem('gameState', JSON.stringify(this.boxes));
  }

  checkWin() {
    const conditions: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 4, 8],
      [2, 4, 6],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    for (const condition of conditions) {
      const box1 = this.boxes[condition[0]];
      const box2 = this.boxes[condition[1]];
      const box3 = this.boxes[condition[2]];

      if (box1.value !== '' && box1.value === box2.value && box1.value === box3.value) {
        this.result = `Player ${box1.value} wins!`;
        this.resultAnimation = 'scalePopUp 500ms 1';
        this.gameEnd = true;
        this.gameBlur = 'blur(5px)';
        this.gameBlock = 'block';
        this.currentTurn = Math.floor(Math.random() * 2);
        return;
      }
    }

    if (this.boxes.every(box => box.value !== '')) {
      this.result = `Draw!`;
      this.resultAnimation = 'scalePopUp 1000ms 1';
      this.gameEnd = true;
      this.gameBlur = 'blur(5px)';
      this.gameBlock = 'block';
    }
  }

  handleBoxClick(i: number) {
    this.setBoxImage(i);
    this.checkWin();
  }

  resetBoard() {
    this.boxes = [];
    for (let i = 0; i < 9; i++) {
      this.boxes.push(new Box(i, '', ''));
    }

    this.result = '';
    this.resultAnimation = '';
    this.gameEnd = false;
    this.gameBlur = '';
    this.gameBlock = 'none';
    this.currentTurn = Math.floor(Math.random() * 2);

    localStorage.setItem('gameState', JSON.stringify(this.boxes));
  }
}
