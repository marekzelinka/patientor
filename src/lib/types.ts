type UnionOmit<T, K extends string | number | symbol> = T extends unknown
	? Omit<T, K>
	: never;

export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

type EntryType = "Hospital" | "OccupationalHealthcare" | "HealthCheck";

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Diagnosis["code"][];
	type: EntryType;
}

interface HospitalEntry extends BaseEntry {
	type: "Hospital";
	discharge: {
		date: string;
		criteria: string;
	};
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	};
}

export const HealthCheckRating = {
	Healthy: 0,
	LowRisk: 1,
	HighRisk: 2,
	CriticalRisk: 3,
};
export type HealthCheckRating =
	(typeof HealthCheckRating)[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

export type EntryFormValues = UnionOmit<Entry, "id">;

export const Gender = {
	Male: "male",
	Female: "female",
	Other: "other",
} as const;
export type Gender = (typeof Gender)[keyof typeof Gender];

export interface Patient {
	id: string;
	name: string;
	occupation: string;
	gender: Gender;
	ssn?: string;
	dateOfBirth?: string;
	entries?: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
