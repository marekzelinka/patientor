import axios from "axios";
import { apiBaseUrl } from "../lib/constants.ts";
import type {
	Entry,
	EntryFormValues,
	Patient,
	PatientFormValues,
} from "../lib/types.ts";

export const patientService = {
	findAll: async () => {
		const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

		return data;
	},
	findById: async (id: Patient["id"]) => {
		const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

		return data;
	},
	createOne: async (object: PatientFormValues) => {
		const { data } = await axios.post<Patient>(
			`${apiBaseUrl}/patients`,
			object,
		);

		return data;
	},
	createEntry: async (id: Patient["id"], object: EntryFormValues) => {
		const { data } = await axios.post<Entry>(
			`${apiBaseUrl}/patients/${id}/entries`,
			object,
		);

		return data;
	},
};
