## Inspiration
As HelloFresh Customers ourselves we wanted to solve a problem we encounter regularly.

**Collaborative cooking with recipes personalized to us.**

Especially considering the vast range of recipes HelloFresh offers, it is hard to find the right recipe for the right occasion📝. Subsequently, we wanted to solve this problem by offering an intuitive way to find recipes that fit your needs and your taste while also being able to share and cook them with your friends and family👨‍👩‍👧‍👦.

## What it does
FreshFinder acompanies you from the selection of a recipe to the cooking process. It presents a personalized recipe recommendation using a clean and easy to use UI. Not fully satisfied? Easily, adjust your recipes with the help of OpenAI. 

Now let's start cooking👨‍🍳. Have friends over🫂? No problem! Just add them to your session. The App will take care of an efficient synchronization so you can focus on having fun.

## How we built it
We built the project using a React-based website in the front end to support all common platforms🖥️. The backend is built using Supabase and a PostgreSQL database containing the user information as well as the data for the recipes📙.

The recommendation is based on a smart algortihm based on selective filtering🧠. The recipe personilization is done using OpenAI's API while the synchronization is done using Supabase's RealTime Channels. 

## Challenges we ran into
- **Synchronize** the cooking process of multiple users as effiecient as possible.
- Creating a correct and **useful prompt** for OpenAI to generate a personalized recipe.
- **Dependency Analysis** to prevent unnecessary waiting times📊.

## Accomplishments that we're proud of
Having a working Prototype that is ready to be used combining multiple cutting edge technologies as well as self written algorithms👾.

A simple and intuitive UI that is easy to use and understand while also solving one of our own problems and potentially helping others.

## What we learned
Good coordination and communication is key to a successful project💬.
Additionally, we gained a deep understanding of the technologies we used. While also learning higher level concepts such as how to create a good user experience. 

## What's next for FreshFinder
- Combine the indivdual personlization with OpenAI with the synchronization feature.
- Complete Implementation with ML for better recommendations.
- Create a Social Media Platform. History of recipes, friends, ratings, etc.
- Take advantage of our open design to invite further contributions🤝.