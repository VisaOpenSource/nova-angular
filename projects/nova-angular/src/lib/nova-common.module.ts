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
import { NgModule } from '@angular/core';
import { AddArrowKeysDirective } from './add-arrow-keys/add-arrow-keys.directive';
import { AlternateDirective } from './alternate/alternate.directive';
import { BreakpointsDirective } from './breakpoints/breakpoints.directive';
import { DualIconDirective } from './dual-icons/dual-icons.directive';
import { ElevationDirective } from './elevation/elevation.directive';
import { FlexDirective } from './flex/flex.directive';
import { MarginDirective } from './margin/margin.directive';
import { OpensInNewTabDirective } from './opens-in-new-tab/opens-in-new-tab.directive';
import { PaddingDirective } from './padding/padding.directive';
import { ScreenreaderOnlyDirective } from './screenreader-only/screenreader-only.directive';
import { SurfaceDirective } from './surface/surface.directive';

@NgModule({
  imports: [
    AddArrowKeysDirective,
    AlternateDirective,
    BreakpointsDirective,
    DualIconDirective,
    ElevationDirective,
    FlexDirective,
    MarginDirective,
    OpensInNewTabDirective,
    PaddingDirective,
    ScreenreaderOnlyDirective,
    SurfaceDirective
  ],
  exports: [
    AddArrowKeysDirective,
    AlternateDirective,
    BreakpointsDirective,
    DualIconDirective,
    ElevationDirective,
    FlexDirective,
    MarginDirective,
    OpensInNewTabDirective,
    PaddingDirective,
    ScreenreaderOnlyDirective,
    SurfaceDirective
  ]
})
export class NovaCommonModule {}
