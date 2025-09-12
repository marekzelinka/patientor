import { Female, Male, QuestionMark } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Patient } from "../lib/types";
import { patientService } from "../services/patients";

export function PatientPage() {
	const [patient, setPatient] = useState<Patient | null>(null);
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (id) {
			patientService.findById(id).then(setPatient);
		}
	}, [id]);

	return (
		<Box>
			<Stack marginTop={4} direction="row" alignItems="center" spacing={1}>
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
		</Box>
	);
}
