import axios from "axios";
import { apiBaseUrl } from "../constants.ts";
import type { Patient, PatientFormValues } from "../types.ts";

export const patientService = {
	getAll: async () => {
		const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

		return data;
	},
	create: async (object: PatientFormValues) => {
		const { data } = await axios.post<Patient>(
			`${apiBaseUrl}/patients`,
			object,
		);

		return data;
	},
};
