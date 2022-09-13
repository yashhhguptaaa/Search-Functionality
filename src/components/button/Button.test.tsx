import { render } from "@testing-library/react";
import Button from './Button';

it('should render a button with the type Previous', () => {
    render(<Button type="PREVIOUS" handleFunction={() => null} />);
})