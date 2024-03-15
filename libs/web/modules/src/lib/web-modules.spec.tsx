import { render } from '@testing-library/react';

import WebModules from './web-modules';

describe('WebModules', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebModules />);
    expect(baseElement).toBeTruthy();
  });
});
