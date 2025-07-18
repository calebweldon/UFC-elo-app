package com.ufc.ufc_elo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "events")
@NoArgsConstructor
@AllArgsConstructor
public class Event {

	@Id
	@Column(name = "event_id")
	private Integer id;

	private String event;

	private LocalDate date;

	private String location;

	public Integer getId() {
		return id;
	}

	public String getEvent() {
		return event;
	}

	public LocalDate getDate() {
		return date;
	}

	public String getLocation() {
		return location;
	}
}
