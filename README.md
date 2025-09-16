This is a serverless, progressive web app build with React using a test-driven developement technique. The application will use the Google Calendar API to fetch upcoming events.

Key Features:

  1. Filter events by city,
  2. Show/hide event details,
  3. Specify number of events,
  4. Use the app when offline,
  5. Add an app shortcut to home screen, and
  6. Display charts visualizing event details.

User stories and scenarios:

•	As a user, I should be able to filter events by city so that I can see a list of events taking place in that city. 

      1.	Given user hasn’t searched for any city; When the user opens the app; Then the user should see a list of upcoming events. 
      2.	Given the main page is open; When user starts typing in the city textbox; Then the user should receive a list of cities (suggestions) that match what they’ve typed. 
      3.	Given user was typing “Berlin” in the city textbox AND the list of suggested cities is showing; When the user selects a city (i.e., “Miami, Florida”) from the list; Then their city should be changed to that city (i.e., “Miami, Florida”) AND the user should               receive a list of upcoming events in that city.  
			
  •	As a user, I should be able to click on an event so that I can see and hide more details about the event.
	
      1.	Given the user has searched for and selected a city to see events from; When the event list populates; Then the user should see events by name, with any details about the event hidden by default.
      2.	Given the user has found an event they are interested in; When they click on the event/button; Then the user should be able to see expanded details about the event (date, time, location, etc.)
      3.	Given the user has an expanded event view open; When they click on the event/button again; Then the user should be able to collapse the event view to hide the details. 
			
  •	As a user, I should be able to specify the number of events displayed so that I can further narrow my search.
	
      1.	Given the user hasn’t specified a number of events to display; When the user loads a list of events; Then 32 events will be shown to the user by default.
      2.	Given the user changes how many events to display (e.g., 12 events); When the user loads/reloads the list of events; Then the specified number of events will be shown to the user. 
			
  •	As a user, I should be able to use the app when offline so that I can still see cached data in case of connection or service issues. 
	
      1.	Given the user has no/weak internet connection; When the user attempts to open the app to load information; Then the user will be shown any data that is cached on the app.  
      2.	Given the user has no internet connection and has the app open displaying cached data; When then user attempts to update search settings (e.g., city, number of events); Then the app should display an error message.
			
  •	As a user, I should be able to add an app shortcut to my home screen so I can access the app more easily. 
	
      1.	Given the user has the app open and wants to install a shortcut to the app on their homepage; When the user clicks on the “Install Shortcut” option (or something similar); Then an app shortcut will be installed on the user’s home screen. 
			
  •	As a user, I should be able to display charts visualizing event details so that I can compare the event density in different cities, perhaps to assist in making travel planning. 
	
      1.	Given the user has the app open and is displaying an event list for a city; When the user scrolls down or clicks “Display Event Visualizer” (or something similar); Then the user should be able to see a graph visualizing the number of events in that city.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
