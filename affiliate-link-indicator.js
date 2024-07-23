// ==UserScript==
// @name         Affiliate Link Indicator
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Adds a visual indicator to affiliate links and shows the affiliate part with a warning on page load and runs on page modifications.
// @author       dimani128
// @match        *://*/*
// @grant        none
// @require      https://raw.githubusercontent.com/dimani128/tampermonkeyscripts/main/notificationSystem.js
// ==/UserScript==

(function() {
    'use strict';

    // List of affiliate keywords to look for in URL parameters
    const affiliateKeywords = ['aff', 'affiliate', 'ref', 'tag', 'partner', 'utm_source'];

    // // Function to check if a URL is an affiliate link and return the affiliate part
    // // Freezes webpage
    // function getAffiliatePart(url) {
    //     const urlObj = new URL(url);
    //     const params = new URLSearchParams(urlObj.search);
        
    //     for (const [key, value] of params.entries()) {
    //         if (affiliateKeywords.some(keyword => key.toLowerCase().includes(keyword))) {
    //             return `${key}=${value}`;
    //         }
    //     }
    //     return null;
    // }

    // Function to add a visual indicator to affiliate links
    function addIndicator(link, affiliatePart=null) {
        link.style.border = '2px solid red';
        if (link.title !== '') {
            link.title += '\n\n';
        }
        link.title += `This seems to be an affiliate link`;
        if (affiliatePart != null) {
            link.title += `("${affiliatePart}")`;
        }
    }

    // Function to process links on the page
    function processLinks() {
        const links = document.querySelectorAll('a');
        let foundAffiliateLink = false;

        links.forEach(link => {
            // const affiliatePart = getAffiliatePart(link.href);
            // if (affiliatePart) {
            //     addIndicator(link, affiliatePart);
            //     foundAffiliateLink = true;
            // }
            addIndicator(link);
            foundAffiliateLink = true;
        });

        if (foundAffiliateLink) {
            displayNotification({
                message: 'Affiliate links detected on this page.',
                duration: 5000,
                backgroundColor: 'rgba(255, 0, 0, 0.8)',
                textColor: 'white'
            });
        }
    }

    // Process links on initial load
    processLinks();

    // Observe changes to the DOM and re-process links if necessary
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                processLinks();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
