import { Female, Male, QuestionMark } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Diagnosis, Patient } from "../lib/types";
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
					<Stack key={entry.id}>
						<Box>
							{entry.date} {entry.description}
						</Box>
						<ul>
							{entry.diagnosisCodes?.map((diagnosisCode) => {
								const diagnose = diagnoses?.find(
									(diagnose) => diagnose.code === diagnosisCode,
								);
								return (
									<li key={diagnosisCode}>
										{diagnosisCode} {diagnose?.name}
									</li>
								);
							})}
						</ul>
					</Stack>
				))}
			</Stack>
		</Stack>
	);
}
