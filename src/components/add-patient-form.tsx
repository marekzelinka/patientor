import {
	Button,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import type { FormEvent } from "react";
import { Gender, type PatientFormValues } from "../lib/types.ts";

export function AddPatientForm({
	onCancel,
	onSubmit,
}: {
	onCancel: () => void;
	onSubmit: (values: PatientFormValues) => void;
}) {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);

		const name = String(formData.get("name"));
		const occupation = String(formData.get("occupation"));
		const ssn = String(formData.get("ssn"));
		const dateOfBirth = String(formData.get("dateOfBirth"));
		const genderString = String(formData.get("gender"));
		const gender = Object.values(Gender).find(
			(gender) => gender.toString() === genderString,
		);
		if (!gender) {
			return;
		}

		onSubmit({
			name,
			occupation,
			ssn,
			dateOfBirth,
			gender,
		});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<TextField name="name" label="Name" fullWidth />
				<TextField name="ssn" label="Social security number" fullWidth />
				<TextField
					name="dateOfBirth"
					label="Date of birth"
					placeholder="YYYY-MM-DD"
					fullWidth
				/>
				<TextField name="occupation" label="Occupation" fullWidth />
				<InputLabel style={{ marginTop: 20 }}>Gender</InputLabel>
				<Select label="Gender" fullWidth name="gender" defaultValue="other">
					{Object.entries(Gender).map(([label, value]) => (
						<MenuItem key={value} value={value}>
							{label}
						</MenuItem>
					))}
				</Select>
				<Grid>
					<Grid item>
						<Button
							type="button"
							onClick={onCancel}
							style={{ float: "left" }}
							color="secondary"
							variant="contained"
						>
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							type="submit"
							variant="contained"
							style={{
								float: "right",
							}}
						>
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
}
