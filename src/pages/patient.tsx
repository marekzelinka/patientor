import { Female, Male, QuestionMark } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddEntryModal } from "../components/add-entry-modal";
import { EntryDetails } from "../components/entry-details";
import type { Diagnosis, EntryFormValues, Patient } from "../lib/types";
import { diagnosisService } from "../services/diagnoses";
import { patientService } from "../services/patients";

export function PatientPage() {
	const { id } = useParams<{ id: string }>();

	const [patient, setPatient] = useState<Patient | null>(null);

	useEffect(() => {
		if (id) {
			patientService.findById(id).then(setPatient);
		}
	}, [id]);

	const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

	useEffect(() => {
		diagnosisService.findAll().then(setDiagnoses);
	}, []);

	const [modalOpen, setModalOpen] = useState(false);
	const [addEntryErrorMessage, setAddEntryErrorMessage] = useState<string>();

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setAddEntryErrorMessage(undefined);
	};

	const addPatientEntry = async (values: EntryFormValues) => {
		try {
			if (!patient) {
				return;
			}

			const entry = await patientService.createEntry(patient.id, values);

			setPatient({
				...patient,
				entries: patient?.entries?.concat(entry) ?? [],
			});
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
					setAddEntryErrorMessage(message);
				} else {
					setAddEntryErrorMessage("Unrecognized axios error");
				}
			} else {
				console.error("Unknown error", event);
				setAddEntryErrorMessage("Unknown error");
			}
		}
	};

	return (
		<Stack marginTop={4} spacing={6}>
			<Stack spacing={2}>
				<Stack direction="row" alignItems="center" spacing={1}>
					<Typography variant="h6">{patient?.name} </Typography>
					{patient?.gender === "male" ? (
						<Male />
					) : patient?.gender === "female" ? (
						<Female />
					) : (
						<QuestionMark />
					)}
				</Stack>
				<dl>
					<dt>SSN</dt>
					<dd>{patient?.ssn}</dd>
					<dt>Occupation</dt>
					<dd>{patient?.occupation}</dd>
				</dl>
			</Stack>
			<Stack spacing={2}>
				<Typography fontWeight="600">Entries</Typography>
				{patient?.entries?.map((entry) => (
					<EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
				))}
				<AddEntryModal
					isOpen={modalOpen}
					onSubmit={addPatientEntry}
					error={addEntryErrorMessage}
					onClose={closeModal}
				/>
				<Button
					type="button"
					onClick={openModal}
					style={{ alignSelf: "start" }}
					variant="contained"
					color="primary"
				>
					Add new entry
				</Button>
			</Stack>
		</Stack>
	);
}
