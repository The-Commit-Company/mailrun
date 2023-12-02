import './App.css'
import { ThemeProvider } from "@/components/theme-provider"
import { FrappeProvider } from 'frappe-react-sdk'

function App() {

	return (
		<ThemeProvider>
			<FrappeProvider>

			</FrappeProvider>
		</ThemeProvider>
	)
}

export default App
