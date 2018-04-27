import { TimeShare } from './time-share';
import { createElement } from '../../__tests__/prepare-dom';

describe('create time share chart', () => {
  it('Should create without error', () => {
    const e = createElement();
    new TimeShare({
      selector: e,
    });
  });
});