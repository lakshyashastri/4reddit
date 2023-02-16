- Add show/hide password
- Profile page box md flex: customise profile page for phone?
- Calculate basename depending on nodejs environment OS

- loading profile page loads "user not found" for a second
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
- [ ] START REPORTS: NAYA CHEEZ HAI KAAFI MARKS KA LIPAT JAYEGA
  - [X] Join requests: just copy saved posts layout, then display a list element with buttons
  - [ ] Stats: ask cgt? how to maintain records or use triggers to upate data (and make it accurate to some time unit)
  - [ ] Reported page: add yellow flag next to like dislike, then pop modal (be careful about the comment bug, same cheez hone ke chances)
    - [ ] Simple ass requirements like one button fades two other buttons
    - [ ] "blocked user" again same ass regex search from backend (turn to u/blockeduser (what happens if someone registers as u/blockeduser? make that username unavailable. also might need to make it just for that boardit or that post))
      - [ ] will have to make a sep path to get shit for the reports page, to make it easy make it so that the mod cant see it on the main posts page
    - [ ] even the bumass timer thing is easy cause you can just check before showing everytime and delete if old
- [ ] comments thing fix: ids wrong coming from frontend or something: check console logs in [NewCommentModal.jsx](frontend/src/components/BoarditPage/NewCommentModal.jsx)
- [ ] username edit fix: easy hai just one query

- can user send req again if req rejected
NOTE: protecting routes using jwt AND protecting exploitation by doing direct API calls ARE DIFFERENT THINGS: THEY CARRY SEPARATE WEIGHTAGE SO ENSURE BOTH