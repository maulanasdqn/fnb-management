import { render } from '@testing-library/react';

import Molecules from './molecules';

describe('Molecules', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Molecules />);
    expect(baseElement).toBeTruthy();
  });
});
