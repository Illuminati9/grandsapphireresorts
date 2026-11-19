import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());
const { reservationDetails, reservationConfigurationErrors } = await import("../src/data/reservations.ts");
const errors = reservationConfigurationErrors(reservationDetails, true);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Reservation configuration is ready for a production build.");
}
