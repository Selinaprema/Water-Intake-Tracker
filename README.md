# Water-Intake-Tracker

## Description  
A simple water intake tracker app where users can log their daily water intake in milliliters, monitor their hydration progress, and track if they meet the recommended 2-liter goal. This app allows users to view, add, edit, and delete their water intake history. The front-end is built with React, and Axios is used to interact with a Java backend built with Spring Boot and MySQL.

## Getting Started  

### Prerequisites  
Before running the project, ensure you have the following installed:  

- [Node.js](https://nodejs.org/) - Required to run the front-end React application  
- [npm](https://www.npmjs.com/) - Comes with Node.js to manage dependencies  
- [Java](https://www.java.com/en/) - Required to run the backend Spring Boot application  
- [Spring Boot](https://spring.io/projects/spring-boot) - Backend framework for building the REST API  
- [MySQL](https://www.mysql.com/) - Database for storing water intake entries  
- A modern web browser for testing the app  

### Installation  

Follow these steps to set up the development environment:  

#### Backend Setup  
1. Clone or navigate to your backend project directory.  
2. Install the necessary dependencies using Maven.  
   ```bash
   cd water-intake-tracker
   mvn install

# Project Setup Guide

## Configure the MySQL Database Connection
Configure your MySQL database connection in `application.properties`. Ensure MySQL is running and the database is set up

#### Frontend Setup  
1. Clone or navigate to your Frontend project directory.   
   ```bash
   cd water-tracker-frontend 
   npm install

# Start the Frontend Application:  
1. Open a new terminal and navigate to the frontend folder:   
   ```bash
   cd water-tracker-frontend 
   npm start
  
# Features

## Front-end
- A user-friendly interface built with React.
- **Track daily water intake:** Add, edit, and delete intake records.
- **View progress:** Visual progress bar shows how much of the daily hydration goal has been met.
- **Responsive layout** for both desktop and mobile devices.
- **Water consumption tracking:** Track water intake in milliliters and compare it with the 2L daily goal.
- **Editable entries:** Users can update or remove previously logged water intake.

## Back-end
- Built with Java and Spring Boot to handle API requests.
- Uses **Spring Data JPA** with MySQL for storing water intake data.
- Provides REST API endpoints to log, edit, delete, and retrieve water intake records.
- Calculates and returns the total water consumed.

# Built With
- **React** - A JavaScript library for building user interfaces
- **Axios** - For making API requests to the backend
- **Tailwind CSS** - For styling the front-end
- **Java** - Programming language used for backend
- **Spring Boot** - Backend framework for building REST APIs
- **Spring Data JPA** - ORM framework for database interaction
- **MySQL** - Database for storing water intake records
- **Lombok** - For reducing boilerplate code in Java

# Authors
- **Selina Prema**



