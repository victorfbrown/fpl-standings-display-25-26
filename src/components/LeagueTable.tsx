import { JSX } from 'react';
import { LeagueTableProps } from '../types';

function columnHeader(headerName: string): JSX.Element {
    return <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
        {headerName}
    </th>
}

function columnValues(data: number | string, classSpecifier: string = "",): JSX.Element {
    return <td className={"px-6 py-4 whitespace-nowrap text-sm font-medium text-black " + classSpecifier}>
        {data}
    </td>
}

export default async function LeagueTable(leagueInformation: LeagueTableProps) {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">League Standings</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            {columnHeader("Rank")}
                            {columnHeader("Total Points")}
                            {columnHeader("Player Name")}
                            {columnHeader("Team Name")}
                            {columnHeader(`MW ${leagueInformation.matchweek}`)}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {leagueInformation.players.map((player, index) => (
                            <tr
                                key={`${player.name}-${player.team_name}`}
                                className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                            >
                                {columnValues(index + 1, "font-medium")}
                                {columnValues(player.total.toLocaleString(), "font-semibold")}
                                {columnValues(player.name)}
                                {columnValues(player.team_name)}
                                {columnValues(player.current_matchweek_points, "font-semibold")}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}