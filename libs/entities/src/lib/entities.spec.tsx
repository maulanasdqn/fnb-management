import { render } from '@testing-library/react';

import Entities from './entities';

describe('Entities', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Entities />);
    expect(baseElement).toBeTruthy();
  });
});
