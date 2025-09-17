import {
	Button,
	Divider,
	Grid,
	MenuItem,
	Select,
	Stack,
	TextField,
} from "@mui/material";
import type { FormEvent } from "react";
import { useState } from "react";
import {
	type Diagnosis,
	type EntryFormValues,
	EntryType,
	HealthCheckRating,
} from "../lib/types.ts";

export function AddEntryForm({
	diagnoses,
	onCancel,
	onSubmit,
}: {
	diagnoses: Diagnosis[];
	onCancel: () => void;
	onSubmit: (values: EntryFormValues) => void;
}) {
	const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);

	const [selectedDiagnoses, setSelectedDiagnoses] = useState<
		Diagnosis["code"][]
	>([]);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);

		let newEntry: EntryFormValues;

		switch (entryType) {
			case "HealthCheck": {
				newEntry = {
					type: EntryType.HealthCheck,
					description: String(formData.get("description")),
					date: String(formData.get("date")),
					specialist: String(formData.get("specialist")),
					healthCheckRating: Number(formData.get("healthCheckRating")),
				};

				if (selectedDiagnoses.length > 0) {
					newEntry.diagnosisCodes = selectedDiagnoses;
				}

				break;
			}
			case "Hospital": {
				newEntry = {
					type: EntryType.Hospital,
					description: String(formData.get("description")),
					date: String(formData.get("date")),
					specialist: String(formData.get("specialist")),
					discharge: {
						date: String(formData.get("discharge")),
						criteria: String(formData.get("criteria")),
					},
				};

				if (selectedDiagnoses.length > 0) {
					newEntry.diagnosisCodes = selectedDiagnoses;
				}

				break;
			}
			case "OccupationalHealthcare": {
				newEntry = {
					type: EntryType.OccupationalHealthcare,
					description: String(formData.get("description")),
					date: String(formData.get("date")),
					specialist: String(formData.get("specialist")),
					employerName: String(formData.get("employerName")),
					sickLeave: {
						startDate: String(formData.get("startDate")),
						endDate: String(formData.get("endDate")),
					},
				};

				if (selectedDiagnoses.length > 0) {
					newEntry.diagnosisCodes = selectedDiagnoses;
				}

				break;
			}
		}

		onSubmit(newEntry);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<Stack spacing={2}>
					<Stack spacing={1}>
						<TextField name="description" label="Description" fullWidth />
						<TextField
							type="date"
							name="date"
							label="Date"
							placeholder="YYYY-MM-DD"
							fullWidth
						/>
						<TextField name="specialist" label="Specialist" fullWidth />
						<Select
							label="Diagnosis codes"
							name="diagnosisCodes"
							multiple
							fullWidth
							value={selectedDiagnoses}
							onChange={(event) => {
								const {
									target: { value },
								} = event;
								setSelectedDiagnoses(
									// On autofill we get a stringified value.
									typeof value === "string" ? value.split(",") : value,
								);
							}}
						>
							{diagnoses.map((diagnosis) => (
								<MenuItem key={diagnosis.code} value={diagnosis.code}>
									{diagnosis.code}
								</MenuItem>
							))}
						</Select>
						<Divider />
						<Select
							label="Type"
							name="type"
							value={entryType}
							onChange={(event) =>
								setEntryType(event.target.value as EntryType)
							}
							fullWidth
						>
							{Object.entries(EntryType).map(([label, value]) => (
								<MenuItem key={value} value={value}>
									{label}
								</MenuItem>
							))}
						</Select>
						{entryType === EntryType.HealthCheck ? (
							<Select
								label="Healthcheck rating"
								name="healthCheckRating"
								defaultValue={HealthCheckRating.Healthy}
								fullWidth
							>
								{Object.entries(HealthCheckRating).map(([label, value]) => (
									<MenuItem key={value} value={value}>
										{label}
									</MenuItem>
								))}
							</Select>
						) : entryType === EntryType.Hospital ? (
							<>
								<TextField
									type="date"
									name="date"
									label="Discharde date"
									placeholder="YYYY-MM-DD"
									fullWidth
								/>
								<TextField
									name="criteria"
									label="Discharge criteria"
									fullWidth
								/>
							</>
						) : (
							<>
								<TextField
									name="employerName"
									label="Employer name"
									fullWidth
								/>
								<TextField
									type="date"
									name="startDate"
									label="Sickleave start date"
									placeholder="YYYY-MM-DD"
									fullWidth
								/>
								<TextField
									type="date"
									name="endDate"
									label="Sickleave end date"
									placeholder="YYYY-MM-DD"
									fullWidth
								/>
							</>
						)}
					</Stack>
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
				</Stack>
			</form>
		</div>
	);
}
