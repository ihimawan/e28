## P3 Peer Review

+ Reviewer's name: Indri Himawan
+ Reviwee's name: Charlie Wellesley
+ URL to reviewee's Github repo: *<https://github.com/charlie-harvard/e28>*
+ URL <http://p3.charlieis.me>

*Include context and code examples in your answers when relevant.*

### Are you able to produce any errors or unexpected results?
- I can append query parameters on the search bar so that it returns unexpected results. For example, inserting `bitcoin&from=2019-01-01` as a search query resulted in a `426 UPGRADE REQUIRED` from the news API, which results in the console logging an error. With this, the search bar can benefit from validation. Even better, using axios to do something like this:
```javascript
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
```

### Were there any parts of the interface that you found confusing or unclear?
- `Recent Searches` was unclear to me for a moment. It wasn't separated by any significant character (currently delimited by a space character), so I thought I might have been typing my search query incorrectly. Would be nice if it could be underlined instead or something that is more obvious than just a space between two search queries. A fun idea could be also to link them to the search results themselves.
- Would be nice to add a catch whenever the external API doesn't work so that a text along the lines of `unable to retrieve news` can be shown to the user. Currently it shows empty.

### Are there aspects of the code that you feel were not self-evident and would benefit from comments?
- The package structure overall is easy to follow. I can see the various pages that are available through the package structure and the component `NewsList.vue` is a common component getting used across the pages.
- There are assets that don't look like they are getting used. E.g. `src/assets/favicon/apple-touch-icon.png`
- The existing code is straightforward. Existing logic such as fetching/adding new channels or searching aren't convoluted.

### Are there any parts of the code that you found interesting or taught you something new?
- `api.jsonbin.io` to store JSON!

### Are there any best practices discussed in course material that you feel were not addressed in the code?
- Nothing that I can think of from what I've reviewed.

### Do you have any additional comments not covered in the above questions?
- `app.js` could be simplified such that if the API key changes, you won't have to change it in multiple places/lines. Same thing for the base URL of the news API. There is a feature in axios that you can use to set the base URL:
```javascript
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://myweb.site'
})

export default instance
```

