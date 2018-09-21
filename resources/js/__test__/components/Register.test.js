import React from 'react';
import { shallow } from 'enzyme';
import Register from '../../components/Register';

describe('<Register />', () => {
  it('should render correctly', () => {
    const tree = shallow(<Register />);
    expect(tree).toMatchSnapshot();
  });
});
