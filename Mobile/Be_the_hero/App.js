import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Routes from './src/routes';

class App extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    SplashScreen.hide();
  }
  render(){
    return (
      <Routes />
  );
  }
};


export default App;
