import {
	Alert,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
} from "@mui/material";
import type { PatientFormValues } from "../../types.ts";
import { AddPatientForm } from "./AddPatientForm.tsx";

export function AddPatientModal({
	modalOpen,
	onClose,
	onSubmit,
	error,
}: {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: PatientFormValues) => void;
	error?: string | undefined;
}) {
	return (
		<Dialog fullWidth open={modalOpen} onClose={onClose}>
			<DialogTitle>Add a new patient</DialogTitle>
			<Divider />
			<DialogContent>
				{error ? <Alert severity="error">{error}</Alert> : null}
				<AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
			</DialogContent>
		</Dialog>
	);
}
