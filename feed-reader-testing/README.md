# Project Overview

In this project you are given a web-based application that reads RSS feeds.

## Tests uses jasmine-3.1.0

1. A test that loops through each feed in the `allFeeds` object and ensures it has a URL defined and that the URL is not empty.

2. A test that loops through each feed in the `allFeeds` object and ensures it has a name defined and that the name is not empty.

3. A test that ensures the menu element is hidden by default. You'll have to analyze the HTML and the CSS to determine how we're performing the hiding/showing of the menu element.

4. A test that ensures the menu changes visibility when the menu icon is clicked. This test should have two expectations: does the menu display when clicked and does it hide when clicked again.

5. A test that ensures when the `loadFeed` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container.

6. A test that ensures when a new feed is loaded by the `loadFeed` function that the content actually changes.

## Installing

No installation is needed.
Download as [ZIP](https://github.com/LWebGH/udacity-fend-projects/archive/master.zip) or

```shell
git clone https://github.com/LWebGH/udacity-fend-projects.git
cd feed-reader-testing
```

and run `index.html`