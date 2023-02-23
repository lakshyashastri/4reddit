- Add show/hide password
- Profile page box md flex: customise profile page for phone?
- Calculate basename depending on nodejs environment OS

<!-- - loading profile page loads "user not found" for a second -->
- upvote downvote not at same time (buttons should flip)
- edit profile add username is taken thing
  - change posts of user if username change?
  - disable username all together?

today
- [X] use cases -> 1 -> b -> i (easy marks)
- [ ] use cases -> 1 -> b -> ii (easy marks)
- [X] use cases -> 2 (easy marks: just alter response from backend)
- [X] use cases -> 1 -> c -> ii -> 1 -> a
- [ ] use cases -> 1 -> d -> 2 -> g (EASY)

today (****************IMPLEMENT FAST EK KE BAAD EK****************)
- [ ] 10min video about how JWT works and the concept, and you're done
- [X] START REPORTS: NAYA CHEEZ HAI KAAFI MARKS KA LIPAT JAYEGA
  - [X] Join requests: just copy saved posts layout, then display a list element with buttons
  - [ ] Stats: ask cgt? how to maintain records or use triggers to upate data (and make it accurate to some time unit)
  - [X] Reported page: add yellow flag next to like dislike, then pop modal (be careful about the comment bug, same cheez hone ke chances)
    - [X] Simple ass requirements like one button fades two other buttons
    - [X] "blocked user" again same ass regex search from backend (turn to u/blockeduser (what happens if someone registers as u/blockeduser? make that username unavailable. also might need to make it just for that boardit or that post))
      - [X] will have to make a sep path to get shit for the reports page, to make it easy make it so that the mod cant see it on the main posts page
    - [X] even the bumass timer thing is easy cause you can just check before showing everytime and delete if old
- [X] comments thing fix: ids wrong coming from frontend or something: check console logs in [NewCommentModal.jsx](frontend/src/components/BoarditPage/NewCommentModal.jsx)
- [ ] username edit fix (posts and shit disappear): easy hai just one query in backend
- [ ] Yes. If the user hasn't joined a SG, they shouldn't be able to interact in any way. You can either simply restrict the user from going to SG-specific page, or allow going to the page to see details but restrict interactions. Whatever you choose to do, make sure it's handled from the server side: basically just restrict post like dislike report for blocked and non-members (blocked will still be in member list since they need to show up in members list, so they also can't join): just show window.prompt or something for this
- [ ] `My Sub Greddiits was focused on the ones the logged in user has created for which he assumes the role of a moderator.` I am doing joined subreddits. Fix this by creating new path easy
- [ ] Only mod sees name in Users page?
- [X] on the join requests the fourbar subreddit specific thing disappears
- [ ] ALL documents in each collection (ex boardits) do not have all fields. Standardise somehow: write js script using mongoose to check if exists or something
- [ ] Stats.jsx making 4 requests for each component; fix that (low priority)
- [ ] Delete post takes too much time
- [ ] address DOB/Age thing
- [ ] **PERMISSIONS: ONLY MOD CAN VIEW CERTAIN PAGES AND DELETE: front and back: really easy**

- can user send req again if req rejected
NOTE: protecting routes using jwt AND protecting exploitation by doing direct API calls ARE DIFFERENT THINGS: THEY CARRY SEPARATE WEIGHTAGE SO ENSURE BOTH