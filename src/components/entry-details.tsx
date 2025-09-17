import {
	Favorite,
	LocalHospital,
	MedicalServices,
	Work,
} from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { type Diagnosis, type Entry, HealthCheckRating } from "../lib/types";
import { assertNever } from "../lib/utils";

export function EntryDetails({
	entry,
	diagnoses,
}: {
	entry: Entry;
	diagnoses: Diagnosis[] | null;
}) {
	switch (entry.type) {
		case "HealthCheck": {
			return (
				<Stack spacing={1} border={1} borderRadius={2} p={2}>
					<Stack direction="row" spacing={1} alignItems="center">
						<Box>{entry.date}</Box>
						<MedicalServices />
					</Stack>
					<Box>{entry.description}</Box>
					<Box>
						<Favorite
							color={
								entry.healthCheckRating === HealthCheckRating.Healthy
									? "success"
									: entry.healthCheckRating === HealthCheckRating.LowRisk
										? "warning"
										: entry.healthCheckRating === HealthCheckRating.HighRisk
											? "error"
											: entry.healthCheckRating ===
													HealthCheckRating.CriticalRisk
												? "action"
												: "disabled"
							}
						/>
					</Box>
					<Box>diagnose by {entry.specialist}</Box>
				</Stack>
			);
		}
		case "Hospital": {
			return (
				<Stack spacing={1} border={1} borderRadius={2} p={2}>
					<Stack direction="row" spacing={1} alignItems="center">
						<Box>{entry.date}</Box>
						<LocalHospital />
					</Stack>
					<Box>{entry.description}</Box>
					<Box>diagnose by {entry.specialist}</Box>
				</Stack>
			);
		}
		case "OccupationalHealthcare": {
			return (
				<Stack spacing={1} border={1} borderRadius={2} p={2}>
					<Stack direction="row" spacing={1} alignItems="center">
						<Box>{entry.date}</Box>
						<Work />
						<Box>{entry.employerName}</Box>
					</Stack>
					<Box>{entry.description}</Box>
					<Box fontWeight="600">
						{entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
					</Box>
					<Box>diagnose by {entry.specialist}</Box>
				</Stack>
			);
		}
		default: {
			return assertNever(entry);
		}
	}
}
