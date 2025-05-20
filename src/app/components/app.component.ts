import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { SoundService } from '../service/sound.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: ` <router-outlet></router-outlet> `,
  providers: [DataService, SoundService],
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getJson();
  }
}
