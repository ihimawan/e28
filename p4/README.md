# Project 4
* By: Indri Himawan
* Prod URL: http://p4.indrihimawan.com/

## Resources
* (NEW) Using Vuelidate for name validation
* (NEW) Using Mocha and Chai for `CoreGame` unit testing
* (NEW) Using Cypress for e2e testing
* (NEW) Deployed on Netlify
* (NEW) Using environment variables for game count down (3 seconds in prod but 1 in dev, in order to speed up testing)
* (NEW) Using Firebase to store all available user profiles to be displayed on the main dashboard and the game.
* Used local storage to store player information, such as name, gender, whether they have beaten the game, etc.

## Notes to user/professor about extended development
I wanted to do the feature where there is two way messaging. However, life happened and I know I won't have time to develop it in the way I want to. But I would still like to share my idea on how I would approach creating this feature!

#### Approach 1 - the easy solution but boring
Use Vue's state changes so that once the player sends a message, I could add a `setTimeout` (to simulate a "person" reading and replying to the message). 
* **PRO:** I would not have to change my application architecturally. i.e. I would still be able to save the conversation in local storage.
* **CON:** I would essentially be combining the main application logic with the "computer" reply logic, I'd make my application monolithic and unmaintainable. I won't feel comfortable adding more complex logic into the "computer" because it would be very coupled with the main app. I imagine computer would just replying with a series of random sentences, which can be entertaining for 5 seconds but very boring after.  

#### Approach 2 - the nice solution but it would take a while (I originally wanted to do this one)
Creating a separate service (let's call it, the "messaging service") that would receive calls from the main application (Llama or Alpaca app) and this messaging service would simulate a "person" and persist their reply into firebase. The main application would then need to do a regular ping to the database in order to update the messages the player is seeing.
* **PRO:** Would make my main application cleaner and I would have a separate "computer" logic somewhere else. With this, I can add as much logic as I wanted to make the "computer" seem more realistic. I was looking into some AI options such as Amazon Lex or Chatbot, I thought it would be a fun project to incorporate into.
* **CON:** Would need major restructuring on the messaging side I currently have in the main app. I would need to deprecate the use of localStorage for this approach and use firebase instead. I would also need a way to be able to distinguish between different players so not everybody that uses the main application would have the same exact conversations. This was a deal-breaker for me unless I also develop an authentication service.

#### Approach 3 - the ideal solution but I don't have friends
Take `Approach 2` up a notch and instead of a "messaging service" with an AI, it would be with other players. 
* **PRO:** It would be an amazing, funny website of people trying to date each other as Alpacas, and only Alpacas.
* **CON:** I would obviously need to create an authentication service. Ideally there would be some users so I won't have to maintain a repository of fake users. I think the hardest part about this one is just testing. Meaning that it would be nice to have a group and have them chat with each other to see if anything breaks. I guess you can do some automation testing that simulates different users. Or, the lazy choice is just to open a bunch of incognito windows. 

## Credits
* Used Fontawesome (https://github.com/FortAwesome/vue-fontawesome)
* Used Bootstrap's CSS
* NONE of Alpaca pictures are my own! Sources: https://www.boredpanda.com/cute-funny-alpacas/
* NONE of Llama pictures are my own! Source: Google image searches.
* 58 Genders: https://abcnews.go.com/blogs/headlines/2014/02/heres-a-list-of-58-gender-options-for-facebook-users
* NONE of the GIFs are my own! https://giphy.com/search/alpaca
* BG Pattern https://www.shutterstock.com/image-vector/seamless-pattern-cute-alpacas-cactus-1349855225
* Cheers to the person I forced to user test this.
