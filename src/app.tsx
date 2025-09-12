import { Button, Container, Divider, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { apiBaseUrl } from "./lib/constants.ts";
import { DashboardPage } from "./pages/dashboard.tsx";
import { PatientPage } from "./pages/patient.tsx";

export function App() {
	useEffect(() => {
		void axios.get<void>(`${apiBaseUrl}/ping`);
	}, []);

	return (
		<div className="App">
			<Router>
				<Container>
					<Typography variant="h3" style={{ marginBottom: "0.5em" }}>
						Patientor
					</Typography>
					<Button component={Link} to="/" variant="contained" color="primary">
						Home
					</Button>
					<Divider hidden />
					<Routes>
						<Route path="/" element={<DashboardPage />} />
						<Route path="/patients/:id" element={<PatientPage />} />
					</Routes>
				</Container>
			</Router>
		</div>
	);
}
