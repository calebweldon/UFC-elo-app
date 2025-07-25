<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#dependencies">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<div align="center">
  <a href="https://ufc-elo-app.web.app/">
    <img src="https://github.com/user-attachments/assets/d8617a99-dc99-49d2-84fe-211ffd0a0751" alt="Logo" width="880" height="880">
  </a>
  <p><i>Click the link above to be redirected to the website</i></p>
  
  <p>The UFC meets the elo ranking system (popularized by chess). This project combines two of my interests into a cloud-deployed web app.</p>
</div>
<hr>

This project consists of 5 parts:

1. Spring Boot backend service  
2. React web application  
3. Webscraper  
4. Elo engine  
5. Cloud infrastructure
   
   > - AWS RDS hosts Postgres DB  
   > - Google Cloud Run hosts backend service  
   > - Firebase hosts web application


<!-- BUILT WITH -->
### Built With
* [![Spring Boot][SpringBoot-badge]][SpringBoot-url]
* [![React][React-badge]][React-url]
* [![PostgreSQL][PostgreSQL-badge]][PostgreSQL-url]
* [![AWS RDS][RDS-badge]][RDS-url]
* [![Firebase][Firebase-badge]][Firebase-url]
* [![Google Cloud Run][CloudRun-badge]][CloudRun-url]
* [![Maven][Maven-badge]][Maven-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow the steps below to set up and run the project locally on your machine.

### Prerequisites

#### Backend (Spring Boot)
* IntelliJ  
  > While IntelliJ is not required, it is the recommended IDE for building and running this project.
  >
  > ⚠️ **Note:** All instructions will assume use of IntelliJ

* JDK 11  
  > This project requires Java 21.
  >   
  > You can download it from the [Oracle JDK 21 page](https://www.oracle.com/java/technologies/javase-jdk21-downloads.html)
  > 
  > or use a package manager:  
  > - **macOS**:  
  >   ```sh
  >   brew install openjdk@21
  >   ```
  > - **Ubuntu/Linux**:  
  >   ```sh
  >   sudo apt update
  >   sudo apt install openjdk-21-jdk
  >   ```

#### Frontend (React)
* Node
  > You can download the latest version from the [official Node.js website](https://nodejs.org/).  
  >  
  > Or install via a package manager:  
  > - **macOS**:  
  >   ```sh
  >   brew install node
  >   ```
  > - **Ubuntu/Linux**:  
  >   ```sh
  >   sudo apt update
  >   sudo apt install nodejs npm
  >   ```

#### Scraper & Elo Engine (Python)
* Python  
  > The scraper and Elo engine are written in Python.  
  >  
  > You can download the latest version from the [official Python website](https://www.python.org/downloads/).  
  >  
  > Or install via a package manager:  
  > - **macOS**:  
  >   ```sh
  >   brew install python
  >   ```
  > - **Ubuntu/Linux**:  
  >   ```sh
  >   sudo apt update
  >   sudo apt install python3 python3-pip
  >   ```

### Installation

#### 1. Clone the Repository

```sh
git clone https://github.com/calebweldon/UFC-elo-app
cd ufc-elo-app/
```

---

#### 2. Run the Python Components

If you want to run the web scraper or Elo engine, navigate to their respective directories and run the scripts:

```sh
cd webscraper/
python scrape.py
```

```sh
cd data
python engine.py
```

---

#### 3. Start the Backend

1. Open the project in IntelliJ (or your preferred IDE).  
2. Configure the project SDK to **Java 21**  
   > IntelliJ: `File` → `Project Structure` → `Project` → select **Project SDK: 21**  
3. Create a .env file and fill in the following values;
4. Create a `.env` file in the root directory and fill in the following values:
```env
DB_HOST=ufc-elo-db.cxscs82g44f7.us-east-2.rds.amazonaws.com
DB_USER=readonly_user
DB_PASSWORD=123ufc-read
DB_PORT=5432
```
4. Build the project using Maven Wrapper:

```sh
./mvnw clean install
```

4. Run the Spring Boot application:

```sh
./mvnw spring-boot:run
```

The backend server should now be running at `http://localhost:8080`.

---

### 5. Run the Frontend

To run the React application locally:

1. Navigate to the frontend directory:

```sh
cd ufc-react/ufc-app/
```

2. Install dependencies

```sh
npm install
```

3. Navigate to `src/api/axiosConfig.js` and update the `baseURL` to point to your local backend:

```js
// Change this:
baseURL: "https://ufc-springboot-297559815689.us-west1.run.app",

// To this:
baseURL: "http://localhost:8080",
```

4. Start the development server:

```sh
npm start
```

The app will be available at `http://localhost:3000`.

> ✅ You should now see the frontend calling your local backend running on port 8080

### Dependencies

#### Backend (Spring Boot)
* Java 21
* PostgreSQL JDBC Driver
* dotenv-java (env var loading)

#### Frontend (React)
* React Router DOM 7.7
* Axios 1.1
* Recharts 3.1
* Bootstrap 5.3

#### Scraper & Elo Engine (Python)
* `beautifulsoup4`
* `pandas` 
* `numpy`

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Caleb Weldon | [Website](https://calebweldon.com/) | calebweldon2026@u.northwestern.edu

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
[SpringBoot-badge]: https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white
[SpringBoot-url]: https://spring.io/projects/spring-boot

[Maven-badge]: https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apache-maven&logoColor=white
[Maven-url]: https://maven.apache.org/

[React-badge]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[CloudRun-badge]: https://img.shields.io/badge/Google_Cloud_Run-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white
[CloudRun-url]: https://cloud.google.com/run

[RDS-badge]: https://img.shields.io/badge/Amazon_RDS-527FFF?style=for-the-badge&logo=amazon-aws&logoColor=white
[RDS-url]: https://aws.amazon.com/rds/

[PostgreSQL-badge]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/

[Firebase-badge]: https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black
[Firebase-url]: https://firebase.google.com/
