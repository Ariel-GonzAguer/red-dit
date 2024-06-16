import { render, screen, } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Banner from '../src/components/Header/Banner/Banner';

describe('Banner', () => {
  beforeEach(() => {
    render(<Banner />);
  });

  it('renders the banner', () => {
    const h1 = screen.getByRole('heading', { level: 1 });
    // expect(h1).toBeInTheDocument();
    expect(h1.textContent).toBe("Red-dit");
  });

  it('renders the reddit logo', () => {
    const img = screen.getByAltText('reddit logo');
    expect(img).toBeInTheDocument();
  });
});
