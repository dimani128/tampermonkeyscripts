// ==UserScript==
// @name         Affiliate Link Indicator
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a visual indicator to affiliate links, and a notification.
// @author       Your Name
// @match        *://*/*
// @grant        none
// @require      https://cdn.jsdelivr.net/gh/dimani128/tampermonkeyscripts@latest/notificationSystem.js
// ==/UserScript==

(function() {
    'use strict';

    // List of common affiliate URL parameters
    const affiliateParams = ['aff', 'affiliate', 'ref', 'refid', 'referrer', 'utm_source', 'tag'];

    // Function to check if a URL contains affiliate parameters
    function isAffiliateLink(url) {
        const urlObj = new URL(url);
        return affiliateParams.some(param => urlObj.searchParams.has(param));
    }

    // Function to highlight affiliate links
    function highlightAffiliateLinks() {
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
            if (isAffiliateLink(link.href)) {
                link.style.backgroundColor = 'yellow';
                link.style.border = '2px solid red';
                displayNotification({ message: 'Affiliate link detected!', duration: 3000 });
            }
        });
    }

    // Run the highlight function on page load
    window.addEventListener('load', highlightAffiliateLinks);
})();
