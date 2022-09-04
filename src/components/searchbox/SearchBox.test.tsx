import { render } from '@testing-library/react';
import SearchBox from './SearchBox';

test('renders Search Box Component', () => {
    render(<SearchBox setSearchKeyword={() => null} optimizedFn={() => null} cancelRequest={() => null} searchList={[]} searchKeyword="" onClickOutside={() => null} show={false} />);
});