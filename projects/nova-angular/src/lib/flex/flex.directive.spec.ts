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
import { render } from '@testing-library/angular';

import { FlexDirective } from './flex.directive';

describe('FlexDirective', () => {
  it('should render vAlignContentAround correctly', async () => {
    const { container } = await render('<div vFlex vAlignContentAround>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-align-content-around v-flex v-flex-row');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vAlignContentBetween correctly', async () => {
    const { container } = await render('<div vFlex vAlignContentBetween>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-align-content-between v-flex v-flex-row');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vAlignContentCenter correctly', async () => {
    const { container } = await render('<div vFlex vAlignContentCenter>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-align-content-center v-flex v-flex-row');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vAlignContentEnd correctly', async () => {
    const { container } = await render('<div vFlex vAlignContentEnd>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-align-content-end v-flex v-flex-row');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vAlignContentEvenly correctly', async () => {
    const { container } = await render('<div vFlex vAlignContentEvenly>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-align-content-evenly v-flex v-flex-row');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vAlignContentStart correctly', async () => {
    const { container } = await render('<div vFlex vAlignContentStart>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-align-content-start v-flex v-flex-row');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vAlignItemsBaseline correctly', async () => {
    const { container } = await render('<div vFlex vAlignItemsBaseline>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-align-items-baseline v-flex v-flex-row');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vAlignItemsCenter correctly', async () => {
    const { container } = await render('<div vFlex vAlignItemsCenter>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-align-items-center v-flex v-flex-row');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vAlignItemsEnd correctly', async () => {
    const { container } = await render('<div vFlex vAlignItemsEnd>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-align-items-end v-flex v-flex-row');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vAlignItemsStart correctly', async () => {
    const { container } = await render('<div vFlex vAlignItemsStart>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-align-items-start v-flex v-flex-row');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vAlignItemsStretch correctly', async () => {
    const { container } = await render('<div vFlex vAlignItemsStretch>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-align-items-stretch v-flex v-flex-row');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vAlignSelfAuto correctly', async () => {
    const { container } = await render('<div vAlignSelfAuto>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-align-self-auto');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vAlignSelfBaseline correctly', async () => {
    const { container } = await render('<div vAlignSelfBaseline>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-align-self-baseline');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vAlignSelfCenter correctly', async () => {
    const { container } = await render('<div vAlignSelfCenter>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-align-self-center');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vAlignSelfEnd correctly', async () => {
    const { container } = await render('<div vAlignSelfEnd>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-align-self-end');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vAlignSelfStart correctly', async () => {
    const { container } = await render('<div vAlignSelfStart>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-align-self-start');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vAlignSelfStretch correctly', async () => {
    const { container } = await render('<div vAlignSelfStretch>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-align-self-stretch');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vColGap correctly', async () => {
    const { container } = await render('<div vGap vColGap="1">Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-col-gap-1');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vFlex correctly', async () => {
    const { container } = await render('<div vFlex>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex v-flex-row');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vFlexCol correctly', async () => {
    const { container } = await render('<div vFlex vFlexCol>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex v-flex-col');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vFlexColReverse correctly', async () => {
    const { container } = await render('<div vFlex vFlexColReverse>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex v-flex-col-reverse');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vFlexGrow correctly', async () => {
    const { container } = await render('<div vFlexGrow>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex-grow');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vFlexGrow0 correctly', async () => {
    const { container } = await render('<div vFlexGrow0>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex-grow-0');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vFlexInline correctly', async () => {
    const { container } = await render('<div vFlexInline>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex-inline');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vFlexNoWrap correctly', async () => {
    const { container } = await render('<div vFlex vFlexNoWrap>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex v-flex-nowrap v-flex-row');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vFlexRow correctly', async () => {
    const { container } = await render('<div vFlex vFlexRow>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex v-flex-row');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vFlexRowReverse correctly', async () => {
    const { container } = await render('<div vFlex vFlexRowReverse>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex v-flex-row-reverse');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vFlexShrink correctly', async () => {
    const { container } = await render('<div vFlexShrink>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex-shrink');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vFlexShrink0 correctly', async () => {
    const { container } = await render('<div vFlexShrink0>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex-shrink-0');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vFlexWrap correctly', async () => {
    const { container } = await render('<div vFlex vFlexWrap>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex v-flex-row v-flex-wrap');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vFlexWrapReverse correctly', async () => {
    const { container } = await render('<div vFlex vFlexWrapReverse>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex v-flex-row v-flex-wrap-reverse');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vFlexWrapReverse correctly', async () => {
    const { container } = await render('<div vFlex vFlexWrapReverse>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex v-flex-row v-flex-wrap-reverse');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vGap correctly', async () => {
    const { container } = await render('<div vGap="1">Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-gap-1');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vJustifyContentAround correctly', async () => {
    const { container } = await render('<div vFlex vJustifyContentAround>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex v-flex-row v-justify-content-around');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vJustifyContentBetween correctly', async () => {
    const { container } = await render('<div vFlex vJustifyContentBetween>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex v-flex-row v-justify-content-between');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vJustifyContentCenter correctly', async () => {
    const { container } = await render('<div vFlex vJustifyContentCenter>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex v-flex-row v-justify-content-center');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vJustifyContentEnd correctly', async () => {
    const { container } = await render('<div vFlex vJustifyContentEnd>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex v-flex-row v-justify-content-end');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vJustifyContentEvenly correctly', async () => {
    const { container } = await render('<div vFlex vJustifyContentEvenly>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex v-flex-row v-justify-content-evenly');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vJustifyContentStart correctly', async () => {
    const { container } = await render('<div vFlex vJustifyContentStart>Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flex v-flex-row v-justify-content-start');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render vRowGap correctly', async () => {
    const { container } = await render('<div vFlex vRowGap="1">Child</div>', {
      imports: [FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-row-gap-1 v-flex v-flex-row');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });
});
