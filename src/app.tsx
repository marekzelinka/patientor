import { Button, Container, Divider, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PatientListPage } from "./components/PatientListPage/index.tsx";
import { apiBaseUrl } from "./constants.ts";
import { patientService } from "./services/patients.ts";
import type { Patient } from "./types.ts";

export function App() {
	const [patients, setPatients] = useState<Patient[]>([]);

	useEffect(() => {
		void axios.get<void>(`${apiBaseUrl}/ping`);

		patientService.getAll().then(setPatients);
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
						<Route
							path="/"
							element={
								<PatientListPage
									patients={patients}
									onAddPatient={setPatients}
								/>
							}
						/>
					</Routes>
				</Container>
			</Router>
		</div>
	);
}
