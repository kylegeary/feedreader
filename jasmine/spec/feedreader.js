/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
    /* RSS Feeds test suite */
    describe('RSS Feeds', function() {

        /* This test ensures that the allFeeds variable has been defined and  is not empty. */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed in the allFeeds object and ensures it has a URL which is defined and not empty. */
        it('have a URL which is defined and not empty', function() {
           for(let feed of allFeeds) {
               expect(feed.url).toBeDefined();
               expect(feed.url.length).not.toBe(0);
           }
        });

        /* This test loops through each feed in the allFeeds object and ensures it has a name which is defined and not empty. */
        it('have a name which is defined and not empty', function () {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });

    /* The menu test suite */
    describe('The menu', function() {

        /* This test ensures the menu element is hidden by default, and that the menu displays when clicked again */
        it('is hidden by default', function() {
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
        it('changes visibility when clicked', function() {
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');

            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* Initial Entries test suite */
    describe('Initial Entries', function(){

        /* This test ensures when loadFeed() is called/finished there is at least one .entry element in the .feed container. */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('has at least one entry element in the feed container', function(){
            let numOfEntries = $('.entry').length;
            expect(numOfEntries).toBeGreaterThan(0);
        });
    });

    /* New Feed Selection test suite */
    describe('New Feed Selection', function(){
        var oldFeed;
        var newFeed;

        /* This test ensures that the content changes when a new feed is loaded by loadFeed(). */
        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = $('.feed').html();
                loadFeed(1, done);
            });
        });

        it('verifies that content changes with loadFeed()', function(done){
            newFeed = $('.feed').html();
            expect(newFeed).not.toBe(oldFeed);
            done();
        });
    });
}());
