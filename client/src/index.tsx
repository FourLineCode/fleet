import { MuiThemeProvider } from '@material-ui/core'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import './styles/index.css'
import theme from './ui/themes/MuiTheme'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<MuiThemeProvider theme={theme}>
				<App />
			</MuiThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
