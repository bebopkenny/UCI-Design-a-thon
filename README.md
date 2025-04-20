# Global Hazard Tracker

**Global Hazard Tracker** is a web-based application that visualizes real time natural hazards around the world using a fully interactive 3D globe. By integrating live data from several government-backed APIs, the project maps hazards such as earthquakes, wildfires, tsunamis, and tornadoes directly onto the globe using accurate latitude and longitude coordinates. The result is a dynamic and engaging way for users to explore global environmental events as they unfold.

The platform is designed to be intuitive and accessible to all users. Whether used in a classroom setting, by researchers, or by the general public, the user interface is simple enough for anyone to navigate and begin learning right away. The goal of the project is to make real time global hazard information more visible and easier to understand by combining scientific data with an interactive educational experience.

## Purpose and Inspiration

The initial idea for the project came from a video I saw that demonstrated a 3D globe tracking satellites in real time using NASA’s API. I was inspired by the way data was visualized and wanted to apply that concept to something that could inform and educate people about the world we live in. After several iterations, I focused on global hazard tracking, with the aim of centralizing real time natural disaster data in a way that is visually impactful and educational.

As part of the research phase, I spoke with professors in the geology department at California State University, Fullerton. One professor, Dr. Kirby, mentioned that he often has to visit several different websites to track natural hazards for his classes and research. He emphasized how helpful it would be to have a single platform that combines multiple sources of hazard data. His insights guided much of the functionality and purpose behind the project.

The project is also meant to highlight the importance of publicly funded, science-based data. Professor Kirby explained that some of the most accurate sources of hazard information, such as NOAA and the USGS, are at risk of being defunded. By integrating APIs from these organizations, this project aims to showcase the value of these resources and raise awareness about the role they play in public education and safety.

## How It Works

When users visit the homepage, they are introduced to a simple and welcoming interface. From there, they can immediately begin exploring the globe or scroll down for more information and resources. On the left side of the screen, a sidebar allows users to select different hazard types including earthquakes, wildfires, tsunamis, and tornadoes. When a hazard is selected, the globe updates to display animated markers showing live or historical data points for that hazard.

The right sidebar displays live statistics based on the selected hazard. For example, when earthquakes are selected, users can view details such as magnitude, location, and alert level. Wildfires display intensity and confidence data, while tsunamis and tornadoes show location, severity, and descriptions. This sidebar provides important context and insight, helping users understand what is happening and where.

In addition to data visualization, the homepage also includes a section dedicated to preparation and awareness. There are educational resources for students and educators, as well as donation links to support organizations that provide hazard relief and scientific research. The intent is not only to visualize danger, but to equip people with tools to act, prepare, and stay informed.

## Technologies Used

Global Hazard Tracker was built using modern web technologies and libraries. The frontend was developed using Next.js 15 with TypeScript, and Three.js was used to handle 3D rendering of the globe. The project also uses Tailwind CSS for styling and particles.js for subtle visual enhancements.

Live hazard data is fetched from a variety of public APIs, including:

- The United States Geological Survey (USGS) Earthquake API
- Ambee’s Wildfire and Air Quality API
- weather.gov Alerts API for tornado data
- NOAA’s open data resources

The app is deployed as a static site using Next.js static export, and is hosted on Hostinger for easy accessibility.

## Challenges and Lessons Learned

One of the biggest challenges in this project was working with APIs that were inconsistent or lacked documentation. Since I was dealing with live data, there were cases where an API would return no results or have a structure that differed from the expected format. Debugging these issues taught me a lot about how REST APIs work and how to handle edge cases gracefully. I also realized how useful a tool like Postman would have been for testing endpoints in advance.

Displaying data in both the 3D globe and the sidebar simultaneously required careful state management and coordination between components. It was also a learning experience in designing clean user interfaces that can adapt to different screen sizes and remain easy to use.

## Future Plans

There are many directions this project can grow. One of the first planned additions is support for more hazard types, such as floods, volcanic eruptions, and landslides. I also want to improve the mobile experience and eventually integrate a notification system that can alert users based on their location if a real time hazard is detected nearby.

Another goal is to provide a fully featured education section with classroom-friendly visualizations, printable materials, and real time event tracking tailored for schools. The app could also integrate with emergency preparation guides and partner with science-based nonprofits to promote awareness and readiness.

## Live Demo and Repository

- Live Site: [https://globalhazard.kennygarcia.net](https://globalhazard.kennygarcia.net)  
- GitHub Repository: [https://github.com/bebopkenny/UCI-Design-a-thon](https://github.com/bebopkenny/UCI-Design-a-thon)
