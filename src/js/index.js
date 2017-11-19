import React from 'react';
import ReactDOM from 'react-dom';
import Example from 'js/components/Example';
import { AppContainer } from 'react-hot-loader';


const render = Component => {
	ReactDOM.render(
	  <AppContainer>
		<Example />
	  </AppContainer>,
	  document.getElementById('root'),
	)
  }
  
  render(App)
  
  // Webpack Hot Module Replacement API
  if (module.hot) {
	module.hot.accept('js/components/Example', () => { render(App) })
  }