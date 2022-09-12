import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  longText = `Founded in 2004, KeyPoint Technologies is the leader in AI, NLP, input & language technology space. Currently on more than 100 million devices, KPT is a trusted partner to OEMs, Operators, and App Developers for developing intelligent interfaces, engines & input experiences.`;
}
