import { render } from '@testing-library/react';

import Atoms from './atoms';

describe('Atoms', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Atoms />);
    expect(baseElement).toBeTruthy();
  });
});
