
// Boundary
export const boundary = {left: -1000, right: 1000, top: 500, bottom: -500}



// Towns
const initialTownPopulationMin = 18
const initialTownPopulationMax = 34
export const getInitialTownPopulation = () => initialTownPopulationMin + Math.random() * (initialTownPopulationMax - initialTownPopulationMin)
const townPossibleNames = [
	"Birmingham", "Liverpool", "Leeds", "Sheffield", "Bristol",
	"Manchester", "Leicester", "Coventry", "Croydon", "Barnet",
	"Kingston upon Hull", "Ealing", "Bradford", "Bromley", "Enfield",
	"Lambeth", "Brent", "Wandsworth", "Stoke-on-Trent", "Wolverhampton",
	"Nottingham", "Lewisham", "Newham", "Plymouth", "Southwark",
	"Hillingdon", "Redbridge", "Southampton", "Reading", "Derby",
	"Havering", "Greenwich", "Waltham Forest", "Haringey", "Hounslow",
	"Bexley", "Harrow", "Hackney", "Camden", "Tower Hamlets",
	"Dudley", "Newcastle upon Tyne", "Northampton", "Merton", "Portsmouth",
	"Luton", "Preston", "Westminster", "Sutton", "Sunderland",
	"Islington", "Norwich", "Richmond upon Thames", "Walsall", "Bournemouth",
	"Hammersmith and Fulham", "Barking and Dagenham", "Southend-on-sea", "Kensington and Chelsea", "Swindon",
	"Kingston upon Thames", "Huddersfield", "Poole", "Oxford", "Middlesbrough",
	"Blackpool", "Oldbury", "Bolton", "Ipswich", "York",
	"West Bromwich", "Peterborough", "Stockport", "Brighton", "Slough",
	"Gloucester", "Watford", "Rotherham", "Cambridge", "Exeter",
]
export const getTownName = () => townPossibleNames[Math.floor(Math.random() * townPossibleNames.length)]
