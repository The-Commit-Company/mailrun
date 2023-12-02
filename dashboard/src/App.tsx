import './App.css'
import { ThemeProvider } from "@/components/theme-provider"
import { FrappeProvider } from 'frappe-react-sdk'
import {
	createBrowserRouter,
	createRoutesFromElements,
	// Route,
	RouterProvider,
} from "react-router-dom";
import { FullPageLoader } from './components/ui/full-page-loader';
import { UserProvider } from './lib/UserProvider';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			{/* <Route path="/" element={<ProtectedRoute />}>
		  <Route index element={<ChannelRedirect />} />
		  <Route path="channel" element={<MainPage />} >
			<Route index element={<ChannelRedirect />} />
			<Route path="saved-messages" lazy={() => import('./components/feature/saved-messages/SavedMessages')} />
			<Route path=":channelID" lazy={() => import('@/pages/ChatSpace')} />
		  </Route>
		</Route> */}
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
					{/* <Toaster /> */}
				</UserProvider>
			</FrappeProvider>
		</ThemeProvider>
	)
}

export default App
