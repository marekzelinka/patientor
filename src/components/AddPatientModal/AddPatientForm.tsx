import {
	Button,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import type { FormEvent } from "react";
import { Gender, type PatientFormValues } from "../../types.ts";

interface GenderOption {
	value: Gender;
	label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map((v) => ({
	value: v,
	label: v.toString(),
}));

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
				<TextField label="Name" fullWidth name="name" />
				<TextField label="Social security number" fullWidth name="ssn" />
				<TextField
					label="Date of birth"
					placeholder="YYYY-MM-DD"
					fullWidth
					name="dateOfBirth"
				/>
				<TextField label="Occupation" fullWidth name="occupation" />

				<InputLabel style={{ marginTop: 20 }}>Gender</InputLabel>
				<Select label="Gender" fullWidth name="gender">
					{genderOptions.map((option) => (
						<MenuItem key={option.label} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
				<Grid>
					<Grid item>
						<Button
							color="secondary"
							variant="contained"
							style={{ float: "left" }}
							type="button"
							onClick={onCancel}
						>
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							style={{
								float: "right",
							}}
							type="submit"
							variant="contained"
						>
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
}
