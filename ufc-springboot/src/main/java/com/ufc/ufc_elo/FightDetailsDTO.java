package com.ufc.ufc_elo;

import java.time.LocalDate;

public class FightDetailsDTO {
	private String opponentName;
	private String event;
	private String location;
	private LocalDate date;
	private String result;
	private Float fighterPreElo;
	private Float fighterPostElo;
	private Float opponentElo;
	private String weightClass;
	private String method;
	private Integer round;
	private String time;

	public FightDetailsDTO(
			String opponentName,
			String event,
			String location,
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
		this.location = location;
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

	public String getOpponentName() {
		return opponentName;
	}

	public String getEvent() {
		return event;
	}

	public String getLocation() {
		return location;
	}

	public LocalDate getDate() {
		return date;
	}

	public String getResult() {
		return result;
	}

	public Float getFighterPreElo() {
		return fighterPreElo;
	}

	public Float getFighterPostElo() {
		return fighterPostElo;
	}

	public Float getOpponentElo() {
		return opponentElo;
	}

	public String getWeightClass() {
		return weightClass;
	}

	public String getMethod() {
		return method;
	}

	public Integer getRound() {
		return round;
	}

	public String getTime() {
		return time;
	}
}
