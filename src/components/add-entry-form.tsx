import { Button, Grid, TextField } from "@mui/material";
import type { FormEvent } from "react";
import type { EntryFormValues } from "../lib/types.ts";

export function AddEntryForm({
	onCancel,
	onSubmit,
}: {
	onCancel: () => void;
	onSubmit: (values: EntryFormValues) => void;
}) {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);

		const description = String(formData.get("description"));
		const date = String(formData.get("date"));
		const specialist = String(formData.get("specialist"));
		const healthCheckRating = Number(formData.get("healthCheckRating"));
		const diagnosisCodes = String(formData.get("diagnosisCodes"));

		onSubmit({
			type: "HealthCheck",
			description,
			date,
			specialist,
			healthCheckRating,
			diagnosisCodes: diagnosisCodes.split(", "),
		});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<TextField name="description" label="Description" fullWidth />
				<TextField
					name="date"
					label="Date"
					placeholder="YYYY-MM-DD"
					fullWidth
				/>
				<TextField name="specialist" label="Specialist" fullWidth />
				<TextField
					name="healthCheckRating"
					label="Healthcheck Rating"
					fullWidth
				/>
				<TextField name="diagnosisCodes" label="Diagnosis codes" fullWidth />
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
