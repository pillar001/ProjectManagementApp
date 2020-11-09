import React from 'react';
import { render, screen } from '@testing-library/react';

import { Img } from '..';

describe('<Img>', () => {
  it('sets correct size', () => {
    render(
      <Img
        alt="Image"
        size="32px:32px"
        src="data:image/jpeg;base64,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"
      />
    );

    expect(screen.getByAltText(/image/i).closest('figure').style.height).toEqual('32px');
    expect(screen.getByAltText(/image/i).closest('figure').style.width).toEqual('32px');
  });

  it('hiddes image for invalid src', () => {
    render(<Img alt="Image" size="32px:32px" src={null} />);

    expect(screen.queryByAltText(/image/i)).not.toBeInTheDocument();
  });

  it('hiddes image for undefiend src', () => {
    render(<Img alt="Image" size="32px:32px" />);

    expect(screen.queryByAltText(/image/i)).not.toBeInTheDocument();
  });

  it('displays image for valid src', () => {
    render(
      <Img
        alt="Image"
        size="32px:32px"
        src="data:image/jpeg;base64,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"
      />
    );

    expect(screen.queryByAltText(/image/i)).toBeInTheDocument();
  });
});
