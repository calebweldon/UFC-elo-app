package com.ufc.ufc_elo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name="fights")
@NoArgsConstructor
@AllArgsConstructor
public class Fight {

	@Id
	@Column(name = "ff_id")
	private Integer id;

	@Column(name = "event_id")
	private Integer eventId;

	@Column(name = "fighter_id")
	private Integer fighterId;

	@Column(name = "opponent_id")
	private Integer opponentId;

	private String result;

	@Column(name = "fighter_pre_elo")
	private BigDecimal fighterPreElo;

	@Column(name = "fighter_post_elo")
	private BigDecimal fighterPostElo;

	@Column(name = "opponent_elo")
	private BigDecimal opponentElo;

	@Column(name = "weight_class")
	private String weightClass;

	private String method;

	private Integer round;

	private String time;

	public Integer getId() {
		return id;
	}

	public Integer getEventId() {
		return eventId;
	}

	public Integer getFighterId() {
		return fighterId;
	}

	public Integer getOpponentId() {
		return opponentId;
	}

	public String getResult() {
		return result;
	}

	public BigDecimal getFighterPreElo() {
		return fighterPreElo;
	}

	public BigDecimal getFighterPostElo() {
		return fighterPostElo;
	}

	public BigDecimal getOpponentElo() {
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
