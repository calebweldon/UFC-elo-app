package com.ufc.ufc_elo.Fight;

import com.ufc.ufc_elo.Event;
import com.ufc.ufc_elo.Fighter.Fighter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name="fights")
@NoArgsConstructor
@AllArgsConstructor
public class Fight {

	@Id
	@Column(name = "ff_id")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "event_id", referencedColumnName = "event_id")
	private Event event;

	@ManyToOne
	@JoinColumn(name = "fighter_id", referencedColumnName = "fighter_id")
	private Fighter fighter;

	@ManyToOne
	@JoinColumn(name = "opponent_id", referencedColumnName = "fighter_id")
	private Fighter opponent;

	private String result;

	@Column(name = "fighter_pre_elo")
	private Float fighterPreElo;

	@Column(name = "fighter_post_elo")
	private Float fighterPostElo;

	@Column(name = "opponent_elo")
	private Float opponentElo;

	@Column(name = "weight_class")
	private String weightClass;

	private String method;
	private Integer round;
	private String time;

	public Integer getId() {
		return id;
	}

	public Event getEvent() {
		return event;
	}

	public Fighter getFighter() {
		return fighter;
	}

	public Fighter getOpponent() {
		return opponent;
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
