package com.ufc.ufc_elo;

import java.time.LocalDate;

public class FightDetailsDTO {
	public String opponentName;
	public String event;
	public LocalDate date;
	public String result;
	public Float fighterPreElo;
	public Float fighterPostElo;
	public Float opponentElo;
	public String weightClass;
	public String method;
	public Integer round;
	public String time;

	public FightDetailsDTO(
			String opponentName,
			String event,
			LocalDate date,
			String result,
			Float fighterPreElo,
			Float fighterPostElo,
			Float opponentElo,
			String weightClass,
			String method,
			Integer round,
			String time
	) {
		this.opponentName = opponentName;
		this.event = event;
		this.date = date;
		this.result = result;
		this.fighterPreElo = fighterPreElo;
		this.fighterPostElo = fighterPostElo;
		this.opponentElo = opponentElo;
		this.weightClass = weightClass;
		this.method = method;
		this.round = round;
		this.time = time;
	}
}
