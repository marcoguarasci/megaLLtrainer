import { Component } from '@angular/core';
import { CaseSelector } from '../components/singleUse/case-selector/case-selector';

@Component({
  selector: 'app-home',
  imports: [CaseSelector],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
