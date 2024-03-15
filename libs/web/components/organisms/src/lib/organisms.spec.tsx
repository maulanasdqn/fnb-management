import { render } from '@testing-library/react';

import Organisms from './organisms';

describe('Organisms', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Organisms />);
    expect(baseElement).toBeTruthy();
  });
});
