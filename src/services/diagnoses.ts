import axios from "axios";
import { apiBaseUrl } from "../lib/constants.ts";
import type { Diagnosis } from "../lib/types.ts";

export const diagnosisService = {
	findAll: async () => {
		const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

		return data;
	},
};
