/**
 *              © 2025 Visa
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 **/
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  OutputRefSubscription,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { filter } from 'rxjs';
import { WorkshopService } from '../../../shared/services/workshop.service';
import { GlobalBannerComponent } from '../../app-components/global-banner/global-banner.component';
import { SiteFooterComponent } from '../../app-components/site-footer/site-footer.component';
import { SiteHeaderComponent } from '../../app-components/site-header/site-header.component';
import { SiteNavComponent } from '../../app-components/site-nav/site-nav.component';

@Component({
  standalone: true,
  providers: [MarkdownService],
  imports: [
    NovaLibModule,
    MarkdownModule,
    RouterModule,
    SiteFooterComponent,
    SiteHeaderComponent,
    SiteNavComponent,
    GlobalBannerComponent
  ],
  selector: 'nova-workshop-docs',
  templateUrl: './docs-layout.docs.html',
  styleUrl: './docs-layout.docs.scss',
  encapsulation: ViewEncapsulation.None
})
export class DocsLayoutComponent implements OnInit, AfterViewInit {
  private readonly content = viewChild<ElementRef>('content');
  readonly workshopService = inject(WorkshopService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  title = 'workshop';
  isHome = true;
  componentName: string | null = null;
  previousURL?: string;
  origin?: string;
  private navigationSubscription?: OutputRefSubscription;

  constructor() {
    if (!this.workshopService.libJsonData) {
      fetch('./lib/nova/documentation.json')
        .then((res) => res.json())
        .then((data) => {
          this.workshopService.libJsonData = data; // only load data on app init
          this.workshopService.libJsonDataReady.set(true);
        });
    }
    if (!this.workshopService.docsJsonData) {
      fetch('./app/workshop/documentation.json')
        .then((res) => res.json())
        .then((data) => {
          this.workshopService.docsJsonData = data.components; // only load data on app init
          this.workshopService.docsJsonDataReady.set(true);
        });
    }
    if (this.route.snapshot.fragment) {
      this.workshopService.urlFragment = this.route.snapshot.fragment;
    }
    // Store the subscription so we can unsubscribe later
    this.navigationSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const route = window.location.pathname;
        const content = this.content();
        if (!content || this.previousURL === route) return;
        content.nativeElement.scrollTop = 0;
        this.workshopService.examples.set([]); // reset examples listing for ALM
        this.workshopService.setHeroTab(0); // reset tab to examples tab

        // given you are on a component/service/utility/foundation page, the route would look like
        // .../components/breadcrumbs or ../services/pagination
        // so we need the second to last part of the route to determine the page type
        // as of now, this is unecessary for any pages that would have a longer route
        const split = route.split('/');
        this.workshopService.pageType.set(split[split.length - 2]);
        this.previousURL = route;
      });
  }

  ngOnInit() {
    this.origin = window.location.origin;
  }

  ngAfterViewInit(): void {
    const content = this.content();
    if (!content) return;
    this.workshopService.content.set(content);
  }

  darkTheme = this.workshopService.isDarkTheme;

  ngOnDestroy(): void {
    this.navigationSubscription?.unsubscribe();
  }
}
