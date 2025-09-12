import {
	Box,
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { patientService } from "../../services/patients.ts";
import type { Patient, PatientFormValues } from "../../types.ts";
import { AddPatientModal } from "../AddPatientModal/index.tsx";
import { HealthRatingBar } from "../HealthRatingBar.tsx";

export function PatientListPage({
	patients,
	setPatients,
}: {
	patients: Patient[];
	setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}) {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [addPatientErrorMessage, setAddPatientErrorMessage] =
		useState<string>();

	const openModal = (): void => setModalOpen(true);

	const closeModal = (): void => {
		setModalOpen(false);
		setAddPatientErrorMessage(undefined);
	};

	const addPatient = async (values: PatientFormValues) => {
		try {
			const patient = await patientService.create(values);

			setPatients(patients.concat(patient));
			setModalOpen(false);
		} catch (event) {
			if (axios.isAxiosError(event)) {
				if (
					event?.response?.data &&
					typeof event?.response?.data === "string"
				) {
					const message = event.response.data.replace(
						"Something went wrong. Error: ",
						"",
					);
					console.error(message);
					setAddPatientErrorMessage(message);
				} else {
					setAddPatientErrorMessage("Unrecognized axios error");
				}
			} else {
				console.error("Unknown error", event);
				setAddPatientErrorMessage("Unknown error");
			}
		}
	};

	return (
		<div className="App">
			<Box>
				<Typography align="center" variant="h6">
					Patient list
				</Typography>
			</Box>
			<Table style={{ marginBottom: "1em" }}>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Gender</TableCell>
						<TableCell>Occupation</TableCell>
						<TableCell>Health Rating</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Object.values(patients).map((patient: Patient) => (
						<TableRow key={patient.id}>
							<TableCell>{patient.name}</TableCell>
							<TableCell>{patient.gender}</TableCell>
							<TableCell>{patient.occupation}</TableCell>
							<TableCell>
								<HealthRatingBar showText={false} rating={1} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<AddPatientModal
				modalOpen={modalOpen}
				onSubmit={addPatient}
				error={addPatientErrorMessage}
				onClose={closeModal}
			/>
			<Button variant="contained" onClick={() => openModal()}>
				Add New Patient
			</Button>
		</div>
	);
}
