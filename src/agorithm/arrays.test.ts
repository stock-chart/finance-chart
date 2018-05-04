import { trimNulls } from './arrays';

test('#trimNulls', () => {
  expect(trimNulls([null, null, 1, 2])).toEqual(
    {
      deleted: 2,
      result: [1, 2]
    }
  )
  expect(trimNulls([1, 2])).toEqual(
    {
      deleted: 0,
      result: [1, 2]
    }
  )
});