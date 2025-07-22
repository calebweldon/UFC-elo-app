package com.ufc.ufc_elo.config;

import io.github.cdimascio.dotenv.Dotenv;

public class DotEnvLoader {

	public static void loadEnv() {
		Dotenv dotenv = Dotenv.configure()
				.filename(".env")
				.directory("./")
				.ignoreIfMalformed()
				.ignoreIfMissing()
				.load();

		dotenv.entries().forEach(entry -> {
			if (System.getProperty(entry.getKey()) == null) {
				System.setProperty(entry.getKey(), entry.getValue());
			}
		});
	}
}
