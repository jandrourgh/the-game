import "./App.scss";
import { Main } from "./pages/main";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Main />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
