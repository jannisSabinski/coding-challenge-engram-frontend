# Coding Challenge Engram – Frontend

Angular Website zur Fotoverwaltung mit Tailwind styling.

## Tech-Stack
- **Angular** – Single Page Application

### Modulare Struktur
Die Anwendung ist in logische Bereiche unterteilt:
* **Public Gallery (`/`)**: Anzeige aller  Bilder.
* **Account-Bereich (`/account/settings`), (`/account/login`)**: Login-Form und Account verwaltung.
* **My Images (`/my-images`)**: Privater Bereich mit erweiterten CRUD-Funktionen.

### Authentifizierung & Security
* **Session-Simulation**: Anmeldedaten werden bei Login in einem Service im Arbeitspeicher vorgehalten um Sessions zu simulieren
* **Interceptor**: Ein zentraler `AuthInterceptor` hängt Basic-Auth-Header automatisch an alle Backend-Requests an.
* **Guards**: `CanActivate`-Guards überprüfen für My Images und Account Settings ob Daten im Arbeitsspeicher stehen und leiten ansonsten zur Login Page um.

### Komponenten
* **Page-Component**: Kernkomponente, welche Bilder anzeigt. Macht eigene Bilder unter My Images durch Route Data tagbar und ermöglicht hier dann auch das hochladen neuer Bilder
* **Login-Component**: stellt Login und Signup Form zur Verfügung
* **Settings-Component**: ermöglicht das Ändern von Passwörtern und das Löschen von Accounts
* **Popup-, Loading-Spinner-Component**: wiederverwendbare komponenten für Lade-Animationen und Pop-Ups
* **Picture-Card**: Anzeige von den einzelnen Bildern mit Tags



## Lokales Setup
1. in environment.ts local environment auskommentieren / prod environment einkommentieren
2. npm install \
   npm start

App läuft dann unter http://localhost:4200.
Das Backend muss separat gestartet werden (siehe Backend README).

## Live Demo
https://coding-challenge-engram-frontend-production.up.railway.app

## Test-Zugangsdaten
Name: Jannis
Passwort: testtest
