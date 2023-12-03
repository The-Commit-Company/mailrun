import 'cal-sans'
import { ThemeProvider } from "@/components/theme-provider"
import { FrappeProvider } from 'frappe-react-sdk'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import { FullPageLoader } from './components/ui/full-page-loader';
import { UserProvider } from './lib/UserProvider';
import { Newsletters } from './pages/Newsletters';
import { MainPage } from './MainPage';
import { NewsletterEditor } from './pages/NewsletterEditor';
import { Toaster } from 'sonner';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			{/* <Route path="/" element={<ProtectedRoute />}> */}
			<Route element={<MainPage />} >
				<Route path='newsletters' element={<Newsletters />} />
			</Route>
			<Route path='newsletters/:id' element={<NewsletterEditor />} />
			{/* </Route> */}
		</>
	), {
	basename: `/${import.meta.env.VITE_BASE_NAME}` ?? '',
}
)

function App() {

	return (
		<ThemeProvider>
			<FrappeProvider
				url={import.meta.env.VITE_FRAPPE_PATH ?? ''}
				socketPort={import.meta.env.VITE_SOCKET_PORT ? import.meta.env.VITE_SOCKET_PORT : undefined}>
				<UserProvider>
					<RouterProvider router={router} fallbackElement={<FullPageLoader className='w-screen' />} />
					<Toaster />
				</UserProvider>
			</FrappeProvider>
		</ThemeProvider>
	)
}

export default App
