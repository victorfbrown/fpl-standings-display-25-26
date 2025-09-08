import LeagueTable from "../components/LeagueTable";
import { LEAGUE_ID, formatStandingsData, getLeagueData, resetFormattedStandingsData } from "../data/fpl-league-data";
import type { PlayerInformation } from "../types";

export default async function Home() {
  // const leagueData = await getLeagueData(LEAGUE_ID)
  // const allPlayerInformation: PlayerInformation[] = formatStandingsData(leagueData)
  const allPlayerInformation: PlayerInformation[] = await resetFormattedStandingsData()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          FPL League Standings
        </h1>
        <LeagueTable players={allPlayerInformation} />
      </div>
    </div>
  );
}
