import React, {Component} from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';

class WrapperComponent extends Component {

  componentDidMount() {
    window.top.document.body.className="";
  }

  render (){
    return this.props.children
  }

}

const ReftestWrapper = (story) => (
   <WrapperComponent>
    {story()}
  </WrapperComponent>
);

storiesOf('Welcome', module)
 // .addDecorator(ReftestWrapper)
  .add('to Storybook', () => (
      <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));
