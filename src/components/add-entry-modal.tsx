import {
	Alert,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
} from "@mui/material";
import type { Diagnosis, EntryFormValues } from "../lib/types.ts";
import { AddEntryForm } from "./add-entry-form.tsx";

export function AddEntryModal({
	diagnoses,
	isOpen,
	onClose,
	onSubmit,
	error,
}: {
	diagnoses: Diagnosis[];
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (values: EntryFormValues) => void;
	error?: string | undefined;
}) {
	return (
		<Dialog fullWidth open={isOpen} onClose={onClose}>
			<DialogTitle>Add a new patient entry</DialogTitle>
			<Divider />
			<DialogContent>
				{error ? <Alert severity="error">{error}</Alert> : null}
				<AddEntryForm
					diagnoses={diagnoses}
					onSubmit={onSubmit}
					onCancel={onClose}
				/>
			</DialogContent>
		</Dialog>
	);
}
