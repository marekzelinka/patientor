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
import { type EntryFormValues, EntryType } from "../lib/types.ts";

export function AddEntryForm({
	onCancel,
	onSubmit,
}: {
	onCancel: () => void;
	onSubmit: (values: EntryFormValues) => void;
}) {
	const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);

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
					diagnosisCodes: String(formData.get("diagnosisCodes")).split(", "),
					healthCheckRating: Number(formData.get("healthCheckRating")),
				};
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
				const diagnosisCodes = String(formData.get("diagnosisCodes")).split(
					", ",
				);

				if (diagnosisCodes.length > 0) {
					newEntry.diagnosisCodes = diagnosisCodes;
				}

				break;
			}
			case "OccupationalHealthcare": {
				newEntry = {
					type: EntryType.OccupationalHealthcare,
					description: String(formData.get("description")),
					date: String(formData.get("date")),
					specialist: String(formData.get("specialist")),
					diagnosisCodes: String(formData.get("diagnosisCodes")).split(", "),
					employerName: String(formData.get("employerName")),
					sickLeave: {
						startDate: String(formData.get("startDate")),
						endDate: String(formData.get("endDate")),
					},
				};
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
							name="date"
							label="Date"
							placeholder="YYYY-MM-DD"
							fullWidth
						/>
						<TextField name="specialist" label="Specialist" fullWidth />
						<TextField
							name="diagnosisCodes"
							label="Diagnosis codes"
							fullWidth
						/>
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
							<TextField
								name="healthCheckRating"
								label="Healthcheck Rating"
								fullWidth
							/>
						) : entryType === EntryType.Hospital ? (
							<>
								<TextField
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
									name="startDate"
									label="Sickleave start date"
									placeholder="YYYY-MM-DD"
									fullWidth
								/>
								<TextField
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
