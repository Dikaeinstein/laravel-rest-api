import React from 'react';
import { shallow } from 'enzyme';
import Article from '../../../components/Articles/Article';

describe('<Article />', () => {
  it('should render correctly', () => {
    const tree = shallow(<Article
      article={{
        id: '1',
        title: 'Test Article',
        body: 'This is a test article',
      }}
    />);
    expect(tree).toMatchSnapshot();
  });
});
