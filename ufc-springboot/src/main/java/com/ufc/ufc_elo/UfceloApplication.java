package com.ufc.ufc_elo;

import com.ufc.ufc_elo.config.DotEnvLoader;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UfceloApplication {

	public static void main(String[] args) {
		DotEnvLoader.loadEnv();
		SpringApplication.run(UfceloApplication.class, args);
	}
}