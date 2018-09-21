import React from 'react';
import { shallow } from 'enzyme';
import Login from '../../components/Login';

describe('<Login />', () => {
  it('should render correctly', () => {
    const tree = shallow(<Login />);
    expect(tree).toMatchSnapshot();
  });
});
