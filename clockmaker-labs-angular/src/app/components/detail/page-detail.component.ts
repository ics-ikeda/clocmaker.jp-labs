import { switchMap } from 'rxjs/operators';
import type { ItemData } from '../../data/item-data';
import { DataService } from '../../service/data.service';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { SoundService } from '../../service/sound.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../common/footer/footer.component';

@Component({
  selector: 'app-page-detail',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './page-detail.html',
  animations: [
    trigger('routerTransition', [
      transition(':enter', [
        style({ opacity: 0.0 }),
        animate('0.5s ease-in-out', style({ opacity: 1.0 })),
      ]),
      transition(':leave', [
        style({}),
        animate('0.5s ease-in-out', style({ opacity: 0.0 })),
      ]),
    ]),
    trigger('transitionState', [
      state(
        'hide',
        style({
          filter: `brightness(0%)`,
        }),
      ),
      state(
        'show',
        style({
          filter: `brightness(100%)`,
        }),
      ),
      transition('hide => show', animate('0.5s ease-in')),
      transition('show => hide', animate('0.5s ease-out')),
    ]),
    trigger('animateStateH1', [
      state(
        'hide',
        style({
          opacity: 0,
          transform: `translate(-10px, 0)`,
        }),
      ),
      state(
        'show',
        style({
          opacity: 1,
          transform: `translate(0px, 0)`,
        }),
      ),
      transition('hide => show', animate('0.5s cubic-bezier(0, 0, 0, 1)')),
      transition('show => hide', animate('0.5s cubic-bezier(0, 0, 0, 1)')),
    ]),
  ],
  styleUrls: ['../common/header/header.scss', './page-detail.scss'],
})
export class DetailPageComponent implements OnInit {
  @Input() data!: ItemData;

  @Output() private closeEvent = new EventEmitter();

  @HostBinding('@routerTransition') routerTransition = true;

  isLoading = false;
  transitionState = 'hide';
  playingTransition = false;
  iframeUrl?: SafeResourceUrl;
  id: string | null = null;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private soundService: SoundService,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => this.dataService.getDetail(params.id)),
      )
      .subscribe((data: ItemData | null) => {
        if (data != null) {
          requestAnimationFrame(() => {
            this.transitionState = 'hide';

            const delay = this.id === null ? 0 : 500;

            setTimeout(() => {
              this.data = data;
              this._updateVideoUrl();
              this.transitionState = 'show';

              this.id = data.id;
            }, delay);
          });
        } else {
          this.router.navigate(['']);
        }
      });

    this.isLoading = true;

    if ((globalThis as any).ga) {
      (globalThis as any).ga('send', 'pageview', location.pathname);
    }
  }

  private _updateVideoUrl(): void {
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.data.demo,
    );
  }

  private onLoad(): void {
    // 画面更新の予備のため、1ターンだけ待つ
    requestAnimationFrame(() => {
      this.isLoading = false;
    });
  }

  private onClick(): void {
    this.soundService.playClickSound();
    this.router.navigate(['']);
  }

  private onRollOver(): void {
    this.soundService.playMouseOverSound();
  }

  private onClickPrev(): void {
    this.gotoPage(-1);
  }

  private onClickNext(): void {
    this.gotoPage(+1);
  }

  private gotoPage(pageShift: number): void {
    this.soundService.playClickSound();

    const id = this.id;

    if (!id) {
      return;
    }

    const index = this.dataService.getIndex(id);
    const dataItem = this.dataService.getItemAt(index + pageShift);

    if (!dataItem) {
      return;
    }

    this.router.navigate(['/works', dataItem.id]);
  }
}
