import React, { Component } from 'react';
import Header from './components/header/Header';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';
import './scss/main.scss';

class App extends Component {
  state = {
    colorScheme: 'brown'
  }

  handleChangeColorScheme = color => {
    this.setState({
      colorScheme: color
    });
  }

  render() {
    return (
      <div className={`app ${this.state.colorScheme}-theme`}>
        <Header
          colorScheme={this.state.colorScheme}
          handleChangeColorScheme={this.handleChangeColorScheme}
        />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default App;
