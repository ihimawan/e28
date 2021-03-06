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
- None other than the above! I don't see any other console logs or errors from the project.

### Were there any parts of the interface that you found confusing or unclear?
- `Recent Searches` was unclear to me for a moment. It wasn't separated by any significant character (currently delimited by a space character), so I thought I might have been typing my search query incorrectly. Would be nice if it could be underlined instead or something that is more obvious than just a space between two search queries. A fun idea could be also to link them to the search results themselves.
- Would be nice to add a catch whenever the external API doesn't work so that a text along the lines of `unable to retrieve news` can be shown to the user. Currently it shows empty.

### Are there aspects of the code that you feel were not self-evident and would benefit from comments?
- The package structure overall is easy to follow. I can see the various pages that are available through the package structure and the component `NewsList.vue` is a common component getting used across the pages.
- There are assets that don't look like they are getting used. E.g. `src/assets/favicon/apple-touch-icon.png`
- The existing code is straightforward. Existing logic such as fetching/adding new channels or searching aren't convoluted.
- I see that in one of the logic in `NewsList.vue`, with the following:
```javascript
for(let i=0; i<this.myChannels.length; i++){
        if(this.myChannels[i].domain == domain){
          return true;
        }
}
return false;
```
I think that this can instead be converted to using a one liner arrow function, such as:
```javascript
this.myChannels.some(channel => channel.domain === domain)
```
- There is the method `uniqueChannel` in `NewsList.vue` that looks like you are attempting to get a list of unique strings. You can instead use the builtin Javascript Set <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set>.
- `getSourceDomain` could use a bit of explanation on what it does. Judging by what I can see, it seems like it's trying to get the baseURL given a URL. If that is the case, you can simply use regex <https://coderwall.com/p/utgplg/regex-full-url-base-url>

### Are there any parts of the code that you found interesting or taught you something new?
- `api.jsonbin.io` to store JSON!

### Are there any best practices discussed in course material that you feel were not addressed in the code?
- The modal that you currently have in `NewsList.vue` could be its own separate component. This would modularize the code and make it more maintainable.
- I'm not sure if this was mentioned in the course materials or not, but I read sometime ago about how it is a good idea not to modify the DOM manually when using the Vue framework. In `NewsList.vue`, you currently have lines like:
```javascript
let modal = document.getElementById("newsModal");
modal.style.display = "none";
```
This can be converted to using either `v-if` or `v-show` instead.

### Do you have any additional comments not covered in the above questions?
- `app.js` could be simplified such that if the API key changes, you won't have to change it in multiple places/lines. Same thing for the base URL of the news API. There is a feature in axios that you can use to set the base URL:
```javascript
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://myweb.site'
})

export default instance
```
However, excellent job for using the `js` file to pull out common variables!

- Not sure if this was intended, but it looks like `My Channels` is shared across all users of the project, evident by the use one JSONBin location across all users. If this is not intended, I think that the usage of local storage would have been efficient. This would reduce the amount of axios calls as well.
- I am seeing several places where you are using `==` instead of `===`. For example, `this.myChannels[i].domain == domain`. As of right now, I don't see using `==` is affecting your existing code, but since Javacript is dynamically typed, I think it is best to use `===` instead to avoid unexpected results.

