# SemperPops widgets

Static dashboard widgets for the SemperPops Notion page.

- **Clock** — published now at [`clock/`](clock/). Embed [https://semperpops.github.io/widgets/clock/](https://semperpops.github.io/widgets/clock/).
- **Weather** — published now at [`weather/`](weather/). Embed [https://semperpops.github.io/widgets/weather/](https://semperpops.github.io/widgets/weather/).
- **Date** — later
- **Goals** — later

The clock shows Eastern (home), Central, Mountain, Pacific, Alaska, Hawaii, Okinawa, and Germany. The date line and Rayday (day of the year) follow US Eastern time.

The weather strip (Open-Meteo) shows the current temperature, conditions, feels-like, wind, and today’s high, low, and precipitation chance, plus a 7-day forecast. Town buttons default to Spotsylvania, VA and also include Gretna, VA, Rexburg, ID, Camp Lejeune, NC, Charleston, SC, and Tulsa, OK. Each forecast uses that place’s local time. Temperatures are °F and wind is mph.

Day-of-year checks: `node tests/test-rayday.mjs`.
