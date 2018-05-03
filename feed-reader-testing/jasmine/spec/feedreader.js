$(function () {

  // RSS FEEDS TESTS
  describe('RSS Feeds', function () {
    // Validating structure of feed object and content of fields
    it('are defined', function () {
      expect(allFeeds).toBeDefined()
      expect(allFeeds.length).not.toBe(0)
    })

    it('each feed in the allFeeds object has a URL defined and not empty', () => {
      allFeeds.forEach(feed => {
        expect(feed.url).toBeDefined()
        expect(feed.url.length).toBeGreaterThan(0)
      })
    })

    it('each feed in the allFeeds object has a name defined and not empty', () => {
      allFeeds.forEach(feed => {
        expect(feed.name).toBeDefined()
        expect(feed.name.length).toBeGreaterThan(0)
      })
    })

  })

  // MENU TESTS
  describe('The menu', () => {
    const body = document.body

    // Checking initial menu state to be closed
    it('menu element is hidden by default', () => {
      expect(body).toHaveClass('menu-hidden')
    })
    
    // Toggling menu state and validate it
    const menuToggleBtn = document.querySelector('.menu-icon-link')
    it('menu can toggle visibility', () => {
      menuToggleBtn.click()
      expect(body).not.toHaveClass('menu-hidden')
      menuToggleBtn.click()
      expect(body).toHaveClass('menu-hidden')
    })

  })

  // INITIAL ENTRIES TESTS
  describe('initial Entries', () => {
    let entriesElements

    // Loading content for initial page
    beforeAll((done) => {
      loadFeed(0, () => {
        entriesElements = document.querySelectorAll('.feed .entry')
        done()
      })
    })

    // Checking initial page for content presence
    it('there is at least a single .entry element within the.feed container after loadFeed function is called', () => {
      expect(entriesElements.length).toBeGreaterThan(0)
    })
  })
  
  // NEW FEED SELSETIONS TESTS
  describe('New Feed Selection', () => {
    const mapEntriesCollections = (collection) =>
      [...collection].map(node => node.innerHTML)
    let initialEntries
    let anotherEntries

    // Loading content for different feed pages
    beforeAll((done) => {
      loadFeed(0, () => {
        initialEntries = document.querySelectorAll('.feed .entry')
        loadFeed(1, () => {
          anotherEntries = document.querySelectorAll('.feed .entry')
          done()
        })
      })
    })

    // Comparing HTML of different feed pages
    it('when a new feed is loaded by the loadFeed function the content actually changes', () => {
      const initialEntriesHTML = mapEntriesCollections(initialEntries)
      const anotherEntriesHTML = mapEntriesCollections(anotherEntries)
      expect(initialEntriesHTML).not.toEqual(anotherEntriesHTML)
    })
  })
}())
