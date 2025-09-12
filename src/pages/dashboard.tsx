import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { AddPatientModal } from "../components/add-patient-modal.tsx";
import { PatientList } from "../components/patient-list.tsx";
import type { Patient, PatientFormValues } from "../lib/types.ts";
import { patientService } from "../services/patients.ts";

export function DashboardPage() {
	const [patients, setPatients] = useState<Patient[]>([]);

	useEffect(() => {
		patientService.findAll().then(setPatients);
	}, []);

	const [modalOpen, setModalOpen] = useState(false);
	const [addPatientErrorMessage, setAddPatientErrorMessage] =
		useState<string>();

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setAddPatientErrorMessage(undefined);
	};

	const addPatient = async (values: PatientFormValues) => {
		try {
			const patient = await patientService.createOne(values);

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
			<PatientList patients={patients} />
			<AddPatientModal
				isOpen={modalOpen}
				onSubmit={addPatient}
				error={addPatientErrorMessage}
				onClose={closeModal}
			/>
			<Button type="button" onClick={openModal} variant="contained">
				Add New Patient
			</Button>
		</div>
	);
}
