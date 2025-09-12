import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import type { Patient } from "../lib/types.ts";
import { HealthRatingBar } from "./health-rating-bar.tsx";

export function PatientList({ patients }: { patients: Patient[] }) {
	return (
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
						<TableCell>
							<Link to={`/patients/${patient.id}`}>{patient.name}</Link>
						</TableCell>
						<TableCell>{patient.gender}</TableCell>
						<TableCell>{patient.occupation}</TableCell>
						<TableCell>
							<HealthRatingBar showText={false} rating={1} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
